import { useState, useEffect } from 'react';
import '../styles/ActivitiesTable.css';
import axios from 'axios';
import { FiTrash } from 'react-icons/fi';
import { Modal } from '../components/Modal';
import { BUDGET_CATEGORIES } from '../utils/BUDGET_CATEGORIES';
import { formatDate } from '../utils/unitFormats';

export const ActivitiesTable = () => {
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);

  // Pageination bar
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // get the data add it to the table
  const fetchData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.API_URL + '/activities',
        {
          withCredentials: true,
        },
      );
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Submit input data to table
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const title = formData.get('title');
    const price = parseFloat(formData.get('price')) || 0;
    const date = formData.get('date');
    const activitiesType = formData.get('type');
    setRows([...rows, { title, price, date, activitiesType }]);

    // post of submittet activities
    try {
      await axios.post(
        import.meta.env.API_URL + '/activities',
        { title, price, date, activitiesType },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error('Error posting data:', error);
    }
    form.reset();
    setModal(false);
  }

  const deleteRow = async (id) => {
    try {
      await axios.delete(import.meta.env.API_URL + '/activities/' + id, {
        withCredentials: true,
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const totalAmount = rows.reduce((sum, row) => sum + row.price, 0);
  return (
    <div>
      <button
        className="add-activity-button add-job-placement"
        onClick={() => setModal(true)}
      >
        + Add new activity
      </button>
      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>Activities</th>
              <th>Price</th>
              <th>Type</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.price.toLocaleString()} DKK</td>
                <td>{row.activitiesType}</td>
                <td>{formatDate(row.date)}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteRow(row._id);
                    }}
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td scope="row">Total</td>
              <td>{totalAmount.toLocaleString()} DKK</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div className="pagination-bar">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Add Activity"
        onSubmitClick={handleSubmit}
        submitButtonText="Add activity"
      >
        <form>
          <input name="title" placeholder="E.g. rent, subscribtions" required />
          <input name="price" type="number" placeholder="DKK" required />
          <input name="date" type="date" placeholder="DD/MM-YYYY" required />

          <select name="type" required>
            {BUDGET_CATEGORIES.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </form>
      </Modal>
    </div>
  );
};
