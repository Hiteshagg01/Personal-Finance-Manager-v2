import "../styles/pagesStyles/budget.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "../components/Popover";
import Spinner from "../components/Spinner";
import { budgetAll, budgetDelete } from "../redux/budget/budgetSlice";

const Budget = () => {
    const [OpenDropdown, setOpenDropdown] = useState(null);
    const { all, status, error } = useSelector((state) => state.budget);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(budgetAll());
    }, [dispatch]);

    return (
        <section id="budget">
            <div className="title">
                <h1>Budget</h1>
                <button
                    type="button"
                    className="btn btn-primary btn-add"
                    onClick={() => {}}
                >
                    ➕ Add
                </button>
            </div>
            {status === "loading" && (
                <Spinner color="var(--primary-color-900)" />
            )}
            {status === "failed" && <span>{error}</span>}
            {status === "succeeded" && (
                <table className="budgets-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>in</td>
                            <td>in</td>
                            <td>in</td>
                            <td>in</td>
                        </tr>
                        {all.map((budget) => (
                            <tr key={budget.id}>
                                <td>{budget.date}</td>
                                <td className="category-column">
                                    <span>🔖 {budget.category}</span>
                                </td>
                                <td>{budget.amount}</td>
                                <td>
                                    <Popover
                                        key={budget.id}
                                        itemId={budget.id}
                                        isOpen={OpenDropdown === budget.id}
                                        toggleDropdown={(id) =>
                                            setOpenDropdown(id)
                                        }
                                        remove={(id) =>
                                            dispatch(budgetDelete(id))
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default Budget;
