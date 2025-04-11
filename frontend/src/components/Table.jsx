import { useState, useEffect } from "react";
import axios from "axios";

export const Table = () => {
    // Tabel styring
    const [rows, setRows] = useState([]);
    const [fixedRows, setFixedRows] = useState([]);
    // Pop-up modal
    const [modal, setModal] = useState(false);

    const [type, setType] = useState("Variable income"); 
    // Pagination bar
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = rows.slice(startIndex, endIndex); 
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Value format
    const DKKFormat = new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK" });
    const HourFormat = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "hour",
    });

    // Fetching of current users timeplans
    useEffect(() => {
        const fetchTimeplans = async () => {
            try {
                const response = await axios.get("http://localhost:4000/timeplans/get", {
                    withCredentials: true, 
                });
                const fixedIncome = response.data.filter(item => item.type === "Fixed income");
                const variableIncome = response.data.filter(item => item.type === "Variable income");
                setFixedRows(fixedIncome);
                setRows(variableIncome);
                //setRows(type === "Fixed income" ? fixedIncome : variableIncome);
            } catch (error) {
                console.error("Error fetching timeplans:", error);
            }
        };
    
        fetchTimeplans();
    }, [type]); // Re-fetch data when the type changes
    

    // handleSubmit function used for the modal.
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Retrieval of data from form, and ensuring that numbers is floats.
        const type = formData.get("type");
        const job = formData.get("job");
        const hours = parseFloat(formData.get("hours")) || 0;
        const wage = parseFloat(formData.get("wage")) || 0;
        
        // Post of submitted timeplan
        try {
            const response = await axios.post(
                "http://localhost:4000/timeplans/post",
                    {type, job, hours, wage },
                    {
                    withCredentials: true
                    }
            );
            setRows([...rows, response.data]); // Adds a new row to the current array of rows
        } catch(error){
            console.error("Error adding new schema");
        }
        form.reset(); // Ensures input forms is reset after submitting.
    }

    // Used for calculating total amount of hours, and pay in the footers of table.
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
                <h1>Variabel Incomes</h1>
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
         
            <h3>Fixed incomes</h3>
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
                        {fixedRows.length > 0 ? (
                        fixedRows.map((row, index1) => (
                            <tr key={index1}>
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
                </table>
                </section>

            <dialog open={modal} className={modal ? "backdrop" : ""}>
                <form className="inputForms" onSubmit={handleSubmit}>
                    <a className="form-header"> Add hours
                        <button className="unstyledButton" onClick={() => setModal(false)}>x</button>
                    </a>
                    <select 
                        name="type" 
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled selected>Select type of income</option>
                        <option value="Fixed income">Fixed income</option>
                        <option value="Variable income">Variable income</option>
                    </select> 
                    {type === "Variable income" ? (
                    <>
                        <InputFields />
                    </>
                    ) : (
                    <>
                        <select>
                            <option value="" disabled selected>Select repeateance</option>
                            <option value="Repeated monthly" selected>Monthly</option>
                        </select>
                        <InputFields/>
                    </>
                    )}

                    <button className="add-job-button" type="submit" onClick={() => setModal(false)}>Add worked hours</button>
                </form>
            </dialog>
        </div>
    );
};


export const InputFields = () => {
    return(
    <>                        
        <input name="job" placeholder="Job" required />
        <input name="hours" type="number" placeholder="Hours" required />
        <input name="wage" type="number" placeholder="Wage" required />
    </>
)
}
