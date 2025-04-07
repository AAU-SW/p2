import { useState } from "react";

export const Table = () => {
    const [rows, setRows] = useState([]);
    const [modal, setModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = rows.slice(startIndex, endIndex); 
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const DKKFormat = new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK" });
    const HourFormat = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "hour",
    });


    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const job = formData.get("job");
        const hours = parseFloat(formData.get("hours")) || 0;
        const pay = parseFloat(formData.get("pay")) || 0;
        setRows([...rows, { job, hours, pay }]);

        form.reset();
    }
    let totalHours = 0;
    let totalPay = 0;
    for (let i = 0; i < currentRows.length; i++) {
        totalHours += currentRows[i].hours;
        totalPay += currentRows[i].pay * currentRows[i].hours;
    }


    return (
        <div>
            <button class="add-job-placement add-job-button" onClick={() => setModal(true)}>+ Add new hourly pay</button>
            <section className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Wage</th>
                            <th>Hours</th>
                            <th>Total pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.job}</td>
                                <td>{`${DKKFormat.format(row.pay)}/hr`}</td>
                                <td>{HourFormat.format(row.hours)}</td>
                                <td>{DKKFormat.format(row.pay * row.hours)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td scope="row">Total</td>
                            <td></td>
                            <td>{HourFormat.format(totalHours)}</td>
                            <td>{DKKFormat.format(totalPay)}</td>
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
                    <a className="form-header">Add hours
                        <button className="unstyledButton" onClick={() => setModal(false)}>x</button>
                    </a>
                    <input name="job" placeholder="Job" required />
                    <input name="hours" type="number" placeholder="Hours" required />
                    <input name="pay" type="number" placeholder="Wage" required />

                    <button className="add-job-button" type="submit" onClick={() => setModal(false)}>Add worked hours</button>
                </form>
            </dialog>
        </div>
    );
};