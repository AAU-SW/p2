import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash } from 'react-icons/fi';
import { Modal } from './Modal.jsx';

export const TimeplanTable = ({ setWidgetData }) => {
  // Pop-up modal
  const [modal, setModal] = useState(false);
  // Table State
  const [allRows, setAllRows] = useState([]);
  const [table, setTable] = useState(false);

  const [type, setType] = useState('');
  // Pagination bar
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const dataToDisplay = table
    ? allRows.filter((row) => row.type === 'Fixed income')
    : allRows.filter((row) => row.type === 'Variable income');

  const currentRows = dataToDisplay.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataToDisplay.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Value format
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });
  const HourFormat = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'hour',
  });

  // Fetching of current users timeplans
  const fetchTimeplans = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/timeplans/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      setAllRows(response.data);
    } catch (error) {
      console.error('Error fetching timeplans:', error);
    }
  };

  useEffect(() => {
    fetchTimeplans();
  }, []);

  // handleSubmit function used for the modal.
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Retrieval of data from form, and ensuring that numbers is floats.
    const type = formData.get('type');
    const job = formData.get('job');
    const date = formData.get('workedAt');
    const hours = parseFloat(formData.get('hours')) || 0;
    const wage = parseFloat(formData.get('wage')) || 0;
    const fixedIncome = parseFloat(formData.get('fixedIncome'));
    const jobInterval = formData.get('jobInterval');

    // Post of submitted timeplan
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/timeplans/',
        { type, job, hours, date, wage, fixedIncome, jobInterval },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      await fetchTimeplans();
    } catch (error) {
      console.error('Error adding new schema', error);
    }
    form.reset();
    setModal(false);
  }

  const deleteRow = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + '/timeplans/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTimeplans();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const totalHours = allRows.reduce((sum, row) => sum + (row.hours || 0), 0);

  const fixedIncome = allRows
    .filter((row) => row.type === 'Fixed income')
    .reduce((sum, row) => sum + (row.fixedIncome || 0), 0);

  const variableIncome = allRows
    .filter((row) => row.type === 'Variable income')
    .reduce((sum, row) => sum + (row.wage * row.hours || 0), 0);

  useEffect(() => {
    setWidgetData({ fixedIncome, variableIncome, totalHours });
  }, [fixedIncome, variableIncome, totalHours, setWidgetData]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex' }}>
        <div className="toggle-slab-container">
          <button
            className={`toggle-slab-button ${!table ? 'active' : ''}`}
            onClick={() => setTable(false)}
          >
            Variable Income
          </button>
          <button
            className={`toggle-slab-button ${table ? 'active' : ''}`}
            onClick={() => setTable(true)}
          >
            Fixed Income
          </button>
        </div>
      </div>
      <section className="table-container">
        <table>
          {table ? (
            <>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Interval</th>
                  <th>Total pay</th>
                  <th>
                    {' '}
                    <button
                      className="add-job-placement add-job-button"
                      onClick={() => setModal(true)}
                    >
                      + Add income
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row, index1) => (
                    <tr key={index1}>
                      <td>{row.job}</td>
                      <td>{row.jobInterval}</td>
                      <td>{DKKFormat.format(row.fixedIncome)}</td>
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
                  ))
                ) : (
                  <NoData />
                )}
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Wage</th>
                  <th>Hours</th>
                  <th>Total pay</th>
                  <th></th>
                  <th>
                    {' '}
                    <button
                      className="add-job-placement add-job-button"
                      onClick={() => setModal(true)}
                    >
                      + Add income
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.job}</td>
                      <td>{`${DKKFormat.format(row.wage)}/hr`}</td>
                      <td>{HourFormat.format(row.hours)}</td>
                      <td>{DKKFormat.format(row.wage * row.hours)}</td>
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
                  ))
                ) : (
                  <NoData />
                )}
              </tbody>
            </>
          )}
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
          title="Add hours"
          submitButtonText="Add hours"
        >
          <select
            style={{ marginBottom: '10px' }}
            name="type"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>
              Select type of income
            </option>
            <option value="Fixed income">Fixed income</option>
            <option value="Variable income">Variable income</option>
          </select>
          {type === 'Variable income' ? (
            <>
              <VariableIncomeInputFields />
            </>
          ) : (
            <>
              <select style={{ marginBottom: '17px' }} name="jobInterval">
                <option value="" disabled selected>
                  Select repeateance
                </option>
                <option value="Monthly" selected>
                  Monthly
                </option>
              </select>
              <FixedIncomeInputFields />
            </>
          )}
        </Modal>
      </form>
    </div>
  );
};

export const VariableIncomeInputFields = () => {
  return (
    <>
      <input name="job" placeholder="Job" required />
      <input name="hours" type="number" placeholder="Hours" required />
      <input name="wage" type="number" placeholder="Wage" required />
      <input name="workedAt" type="date" placeholder="Wage" required />
    </>
  );
};
export const FixedIncomeInputFields = () => {
  return (
    <>
      <input name="job" placeholder="Job" required />
      <input name="fixedIncome" type="number" placeholder="Income" required />
    </>
  );
};
export const NoData = () => {
  return (
    <tr>
      <td colSpan="4" style={{ textAlign: 'center' }}>
        No data available
      </td>
    </tr>
  );
};
