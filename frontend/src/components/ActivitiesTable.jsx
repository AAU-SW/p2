import { useState, useEffect } from 'react';
import '../styles/ActivitiesTable.css';

import axios from 'axios';
import { FiTrash } from 'react-icons/fi';

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
      const response = await axios.get('http://localhost:4000/activities', {
        withCredentials: true,
      });
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
    setRows([...rows, { title, price, date }]);

    // post of submittet activities
    try {
      await axios.post(
        'http://localhost:4000/activities',
        { title, price, date },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error('Error posting data:', error);
    }
    form.reset();
  }

  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/activities/${id}`, {
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
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.price.toLocaleString()} DKK</td>
                <td>{row.date}</td>
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
      <dialog open={modal} className={modal ? 'backdrop' : ''}>
        <form className="inputForms" onSubmit={handleSubmit}>
          <a className="form-header">
            Add new activity
            <button className="unstyledButton" onClick={() => setModal(false)}>
              x
            </button>
          </a>
          <input name="title" placeholder="E.g. rent, subscribtions" required />
          <input name="price" type="number" placeholder="DKK" required />
          <input name="date" type="date" placeholder="DD/MM-YYYY" required />

          <button
            className="add-activities-button"
            type="submit"
            onClick={() => setModal(false)}
          >
            Submit
          </button>
        </form>
      </dialog>
    </div>
  );
};
