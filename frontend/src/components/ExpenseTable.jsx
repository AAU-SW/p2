import { useState, useEffect } from 'react';
import '../styles/ExpenseTable.css';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';
import { BUDGET_CATEGORIES } from '../utils/BUDGET_CATEGORIES';
import { formatDate } from '../utils/unitFormats';
import {Modal} from "./Modal.jsx";

export const ExpenseTable = () => {
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
        import.meta.env.VITE_API_URL + '/expenses',
        {
          withCredentials: true,
        },
      );
      const filteredRows = response.data.filter(expense => expense.recurring === false);
      setRows(filteredRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const expense = formData.get('expense');
    const amount = parseFloat(formData.get('amount')) || 0;
    const date = formData.get('date');
    const expenseType = formData.get('expenseType');
    const recurring = formData.get('recurring') === 'false';
    setRows([...rows, { expense, amount, date, expenseType, recurring}]);

    // post of submittet expense
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/expenses',
        { expense, amount, date, expenseType, recurring},
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
      await axios.delete(import.meta.env.VITE_API_URL + '/expenses/' + id, {
        withCredentials: true,
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const totalAmount = rows.reduce((sum, row) => sum + row.amount, 0);
  return (
    <div>
      <button
        className="add-job-placement add-job-button"
        onClick={() => setModal(true)}
      >
        + Add new expense
      </button>
      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>expense</th>
              <th>amount</th>
              <th>Type</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.expense}</td>
                <td>{row.amount.toLocaleString()} DKK</td>
                <td>{row.expenseType}</td>
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
      <form onSubmit={handleSubmit}>
      <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title="Add Expense"
          submitButtonText="Add expense"
      >

          <input
              name="expense"
              placeholder="E.g. rent, subscribtions"
              required
          />
          <input name="amount" type="number" placeholder="DKK" required />
          <input name="date" type="date" placeholder="DD/MM-YYYY" required />
          <input name="recurring" type="checkbox" />

          <select name="expenseType" required>
            {BUDGET_CATEGORIES.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
            ))}
          </select>
      </Modal>
      </form>
    </div>
  );
};