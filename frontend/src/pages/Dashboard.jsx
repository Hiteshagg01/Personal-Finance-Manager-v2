// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import { budgetCurrent } from "../redux/budget/budgetSlice";
// import { expenseCurrent } from "../redux/expense/expenseSlice";
// import "../styles/pagesStyles/dashboard.css";

// const Dashboard = () => {
//     const dispatch = useDispatch();

//     const budget = useSelector((state) => state.budget);
//     const expense = useSelector((state) => state.expense);

//     useEffect(() => {
//         dispatch(budgetCurrent());
//         dispatch(expenseCurrent());
//     }, [dispatch]);

//     return (
//         <section id="dashboard">
//             <h1>Dashboard</h1>
//             <div className="dashboard-grid">
//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Total Income</h3>
//                         <small className="info">
//                             <Link to="income">View more</Link>
//                         </small>
//                     </div>
//                     <div className="dashboard-card-content">
//                         <div className="total">₹X,XXX.XX</div>
//                         <small className="info">for current month</small>
//                     </div>
//                 </div>

//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Current Budget</h3>
//                         <small className="info">
//                             <Link to="budget">view details</Link>
//                         </small>
//                     </div>
//                     <div className="dashboard-card-content">
//                         {budget.status === "loading" ? (
//                             <Spinner color="var(--primary-color-900)" />
//                         ) : budget.error ? (
//                             <span>{budget.error}</span>
//                         ) : (
//                             <>
//                                 <div className="total">
//                                     ₹
//                                     {budget.current.reduce(
//                                         (sum, budget) =>
//                                             sum + Number(budget.amount),
//                                         0
//                                     )}
//                                 </div>
//                                 <small className="info">
//                                     for the current month
//                                 </small>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Total Expenses</h3>
//                         <small className="info">
//                             <Link to="expense">view all</Link>
//                         </small>
//                     </div>
//                     <div className="dashboard-card-content">
//                         {expense.status === "loading" ? (
//                             <Spinner color="var(--primary-color-900)" />
//                         ) : expense.error ? (
//                             <span>{expense.error}</span>
//                         ) : (
//                             <>
//                                 <div className="total">
//                                     ₹
//                                     {expense.expenses.reduce(
//                                         (sum, expense) =>
//                                             sum + Number(expense.amount),
//                                         0
//                                     )}
//                                 </div>
//                                 <small className="info">in this month</small>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Your Investments</h3>
//                         <small className="info">
//                             <Link to="investment">view all</Link>
//                         </small>
//                     </div>
//                     <div className="dashboard-card-content">Graph</div>
//                 </div>

//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Expense breakdown</h3>
//                     </div>
//                     <div className="dashboard-card-content">pieChart</div>
//                 </div>

//                 <div className="dashboard-card">
//                     <div className="dashboard-card-header">
//                         <h3 className="card-title">Recent Transactions</h3>
//                         <small className="info">
//                             <Link to="transactions">view more</Link>
//                         </small>
//                     </div>
//                     <div className="dashboard-card-content">
//                         <table></table>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Dashboard;

import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { budgetCurrent } from "../redux/budget/budgetSlice";
import { expenseCurrent } from "../redux/expense/expenseSlice";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Colors
);

const cfgDoughnut = {
    data: {
        labels: ["rent", "medical", "transport", "bills"],
        datasets: [
            {
                label: "Expenses",
                data: [689, 121, 273, 822],
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                enabled: true,
            },
        },
        layout: {
            padding: 16,
        },
    },
};

const cfgLine = {
    data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Investment Value",
                data: [186, 350, 237, 73, 209, 214],
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.33,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    },
};

const Dashboard = () => {
    const budget = useSelector((state) => state.budget);
    const expense = useSelector((state) => state.expense);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("first");
        dispatch(budgetCurrent());
        dispatch(expenseCurrent());
        console.log("second");
    });

    return (
        <section id="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Income</h3>
                    <small>
                        <Link to="income">View more</Link>
                    </small>
                    <p>₹ 18,000</p>
                </div>
                <div className="dashboard-card">
                    <h3>Expenses</h3>
                    <small>
                        <Link to="expense">View all</Link>
                    </small>
                    {expense.status === "loading" ? (
                        <Spinner color="var(--primary-color-900)" />
                    ) : expense.error ? (
                        <span>{expense.error}</span>
                    ) : (
                        <p>
                            ₹{" "}
                            {expense.expenses.reduce(
                                (sum, expense) => sum + Number(expense.amount),
                                0
                            )}
                        </p>
                    )}
                </div>
                <div className="dashboard-card">
                    <h3>Budget</h3>
                    <small>
                        <Link to="budget">View breakdown</Link>
                    </small>
                    {budget.status === "loading" ? (
                        <Spinner color="var(--primary-color-900)" />
                    ) : budget.error ? (
                        <span>{budget.error}</span>
                    ) : (
                        <p>
                            ₹{" "}
                            {budget.budgets.reduce(
                                (sum, budget) => sum + Number(budget.amount),
                                0
                            )}
                        </p>
                    )}
                    {budget.status === "failed" && <p>{budget.error}</p>}
                </div>
                <div className="dashboard-card">
                    <h3>Investments</h3>
                    <small>
                        <Link to="investment">View Details</Link>{" "}
                    </small>
                    <Line data={cfgLine.data} options={cfgLine.options} />
                </div>
                <div className="dashboard-card">
                    <h3>Expense breakdown</h3>
                    <Doughnut
                        data={cfgDoughnut.data}
                        options={cfgDoughnut.options}
                    />
                </div>
                <div className="dashboard-card">
                    <h3>Recent transactions</h3>
                    <table>
                        <tbody>
                            <tr></tr>
                            <tr>
                                <td className="table-particulars">Amazon</td>
                                <td className="table-amount db">-₹19,999</td>
                            </tr>
                            <tr>
                                <td className="table-particulars">Paycheck</td>
                                <td className="table-amount cr">+₹40,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
