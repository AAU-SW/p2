import { useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        const fetchTimeplans = async () => {
            try {
                const response = await axios.get("http://localhost:4000/timeplans/get", {
                    withCredentials: true, // Include cookies if needed
                });
                setRows(response.data); // Update the rows state with the fetched data
            } catch (error) {
                console.error("Error fetching timeplans:", error);
            }
        };
    
        fetchTimeplans();
    }, []);
    


    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const job = formData.get("job");
        const hours = parseFloat(formData.get("hours")) || 0;
        const wage = parseFloat(formData.get("wage")) || 0;
        

        try {
            const response = await axios.post(
                "http://localhost:4000/timeplans/post",
                    {job, hours, wage },
                    {
                    withCredentials: true
                    }
            );
            setRows([...rows, response.data]);
        } catch(error){
            console.error("Error adding new schema");
        }
        form.reset();
    }
    let totalHours = 0;
    let totalPay = 0;
    for (let i = 0; i < currentRows.length; i++) {
        totalHours += currentRows[i].hours;
        totalPay += currentRows[i].wage * currentRows[i].hours;
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
                        {currentRows.length > 0 ? (
                        currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.job}</td>
                                <td>{`${DKKFormat.format(row.wage)}/hr`}</td>
                                <td>{HourFormat.format(row.hours)}</td>
                                <td>{DKKFormat.format(row.wage * row.hours)}</td>
                            </tr>
                        ))
                    ) : ( 
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No data available
                            </td>
                        </tr>
                    )}
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
                    <input name="wage" type="number" placeholder="Wage" required />

                    <button className="add-job-button" type="submit" onClick={() => setModal(false)}>Add worked hours</button>
                </form>
            </dialog>
        </div>
    );
};