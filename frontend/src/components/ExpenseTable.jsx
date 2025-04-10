import { useState } from "react";
import "../styles/expenseTable.css";

export const ExpenseTable = () => {
    const [rows, setRows] = useState([
        // dummy data untill db is ready
        { Expense: "Rent", Amount: 5000, Date: "2025-04-09" },
        { Expense: "Netflix", Amount: 79, Date: "2025-04-05" }
    ]);
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



    // Submit input data to table 
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const Expense = formData.get("Expense");
        const Amount = parseFloat(formData.get("Amount")) || 0;
        const Date = formData.get("Date");
        setRows([...rows, { Expense, Amount, Date }]);

        form.reset();

    }
    
    const totalAmount = rows.reduce((sum, row) => sum + row.Amount, 0);
    return (
        <div>
            <button className="add-job-placement add-job-button" onClick={() => setModal(true)}>+ Add new expense</button>
            <section className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Expense}</td>
                                <td>{row.Amount.toLocaleString()} DKK</td>
                                <td>{row.Date}</td>
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
                    <input name="Expense" placeholder="E.g. rent, subscribtions" required />
                    <input name="Amount" type="number" placeholder="DKK" required />
                    <input name="Date" type="date" placeholder="DD/MM-YYYY" required />

                    <button className="add-expense-button" type="submit" onClick={() => setModal(false)}>Submit</button>
                </form>
            </dialog>
        </div>
    );
};