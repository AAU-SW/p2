import { useState, useEffect } from "react";
import "../styles/ExpenseTable.css";
import axios from "axios";

export const ExpenseTable = ({ setChartData }) => {
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
            const response = await axios.get("http://localhost:4000/expenses", {
                withCredentials: true
            });
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
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

        const expense = formData.get("expense");
        const amount = parseFloat(formData.get("amount")) || 0;
        const date = formData.get("date");
        const expenseType = formData.get("expenseType");
        setRows([...rows, { expense, amount, date, expenseType }]);

        // post of submittet expense
        try {
            const response = await axios.post("http://localhost:4000/expenses", { expense, amount, date, expenseType },
            {
                withCredentials: true
            });
            } catch(error) {
                console.error("Error posting data:", error);
            }
            form.reset();
        }

        useEffect(() => {
            const totalsByType = rows.reduce((acc, row) => {
                acc[row.expenseType] = (acc[row.expenseType] || 0) + row.amount;
                return acc;
            }, {});
    
            const chartData = Object.entries(totalsByType).map(([type, total]) => ({
                label: type,
                value: total,
            }));
    
            setChartData(chartData);
        }, [rows, setChartData]);

    
    const totalAmount = rows.reduce((sum, row) => sum + row.amount, 0);
    return (
        <div>
            <button className="add-job-placement add-job-button" onClick={() => setModal(true)}>+ Add new expense</button>
            <section className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>expense</th>
                            <th>amount</th>
                            <th>type</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.expense}</td>
                                <td>{row.amount.toLocaleString()} DKK</td>
                                <td>{row.expenseType}</td>
                                <td>{row.date}</td>
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
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>
            <dialog open={modal} className={modal ? "backdrop" : ""}>
                <form className="inputForms" onSubmit={handleSubmit}>
                    <a className="form-header">Add new expense
                        <button className="unstyledButton" onClick={() => setModal(false)}>x</button>
                    </a>
                    <input name="expense" placeholder="E.g. rent, subscribtions" required />
                    <input name="amount" type="number" placeholder="DKK" required />
                    <select name="expenseType">
                        <option value="" disabled selected>Select type</option>
                        <option value="Transport" selected>Transport</option>
                        <option value="Rent" selected>Rent</option>
                        <option value="Utilities" selected>Utilities</option>
                        <option value="Entertainment" selected>Entertainment</option>
                        <option value="Other" selected>Other</option>
                    </select>
                    <input name="date" type="date" placeholder="DD/MM-YYYY" required />

                    <button className="add-expense-button" type="submit" onClick={() => setModal(false)}>Submit</button>
                </form>
            </dialog>
        </div>
    );
}