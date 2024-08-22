import {
    ArcElement,
    CategoryScale,
    Chart,
    Colors,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { budgetCurrent } from "../redux/budget/budgetSlice";
import { expenseCurrent } from "../redux/expense/expenseSlice";
import { incomeCurrent } from "../redux/income/incomeSlice";
import { investmentFetch } from "../redux/investment/investmentSlice";
import "./Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Colors
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { current: currentBudgets } = useSelector((state) => state.budget);
    const { current: currentExpenses } = useSelector((state) => state.expense);
    const { current: currentIncomes } = useSelector((state) => state.income);
    const { all: currentInvestments } = useSelector(
        (state) => state.investment
    );

    useEffect(() => {
        dispatch(budgetCurrent());
        dispatch(expenseCurrent());
        dispatch(incomeCurrent());
        dispatch(investmentFetch());
    }, [dispatch]);

    const totalBudget = useMemo(
        () =>
            currentBudgets.reduce(
                (sum, budget) => sum + Number(budget.amount),
                0
            ),
        [currentBudgets]
    );

    const totalExpenses = useMemo(
        () =>
            currentExpenses.reduce(
                (sum, expense) => sum + Number(expense.amount),
                0
            ),
        [currentExpenses]
    );

    const totalIncome = useMemo(
        () =>
            currentIncomes.reduce(
                (sum, income) => sum + Number(income.amount),
                0
            ),
        [currentIncomes]
    );

    const totalInvestment = useMemo(
        () =>
            currentInvestments.reduce(
                (sum, investment) => sum + Number(investment.amount),
                0
            ),
        [currentInvestments]
    );

    const DoughnutData = {
        labels: currentExpenses.map((exp) => exp.category),
        datasets: [
            {
                label: "Expenses",
                data: currentExpenses.map((exp) => Number(exp.amount)),
                borderWidth: 1,
            },
        ],
    };

    const LineData = {
        labels: currentInvestments.map((investment) => new Date(investment.purchaseDate).toLocaleString('default', { month: 'long' })).reverse(),
        datasets: [
            {
                label: "Investment Value",
                data: currentInvestments.map((investment) =>
                    Number(investment.amount)
                ).reverse(),
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.33,
            },
        ],
    };

    return (
        <div className="dashboard">
            <div className="dashboard-grid">
                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Total Income</h2>
                        <small className="card-info">
                            <Link to="/income">View more</Link>
                        </small>
                    </div>
                    <div className="card-content">
                        <div className="card-amount">
                            ₹{totalIncome.toLocaleString("en-IN")}
                        </div>
                        <small className="card-desc">in this month</small>
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Current Budget</h2>
                        <small className="card-info">
                            <Link to="/budget">View Details</Link>
                        </small>
                    </div>
                    <div className="card-content">
                        <div className="card-amount">
                            ₹{totalBudget.toLocaleString("en-IN")}
                        </div>
                        <small className="card-desc">for this month</small>
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Total Spending</h2>
                        <small className="card-info">
                            <Link to="/expense">View All</Link>
                        </small>
                    </div>
                    <div className="card-content">
                        <div className="card-amount">
                            ₹{totalExpenses.toLocaleString("en-IN")}
                        </div>
                        <small className="card-desc">of this month</small>
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Investment Portfolio</h2>
                        <small className="card-info">
                            <Link to="/investments">View Detail</Link>
                        </small>
                    </div>
                    <div className="card-content">
                        <Line data={LineData} />
                        <div className="card-amount">
                            ₹{totalInvestment.toLocaleString("en-IN")}
                        </div>
                        <small className="card-desc">current active</small>
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Spending Overview</h2>
                        {/* <small className="card-info">
                            <Link to="/">Home</Link>
                        </small> */}
                    </div>
                    <div className="card-content">
                        <Doughnut data={DoughnutData} />
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Recent Transactions</h2>
                        <small className="card-info">
                            <Link to="/">Home</Link>
                        </small>
                    </div>
                    <div className="card-content">
                        <div className="card-amount">Brewing</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
