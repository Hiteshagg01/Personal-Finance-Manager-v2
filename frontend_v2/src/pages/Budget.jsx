import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table from "../components/Table";
import {
    budgetAdd,
    budgetAll,
    budgetDelete,
    budgetDetail,
    budgetUpdate,
    resetStatus,
} from "../redux/budget/budgetSlice";
import "./Budget.css";

const columns = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount(₹)" },
    { key: "operations", label: "" },
];

const Budget = () => {
    const dispatch = useDispatch();
    const { all, status, details, error } = useSelector(
        (state) => state.budget
    );

    useEffect(() => {
        dispatch(budgetAll());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        category: "",
        amount: "",
    });

    const [addModalShow, setAddModalShow] = useState(false);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const handleAddBudget = (event) => {
        event.preventDefault();
        dispatch(
            budgetAdd({
                ...formData,
                date: new Date().toISOString().split("T")[0],
            })
        );
        setFormData({
            category: "",
            amount: "",
        });
    };

    const handleEditBudget = (event) => {
        event.preventDefault();
        dispatch(budgetUpdate({ id: formData.id, payload: formData }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        setFormData({
            category: "",
            amount: "",
        });
        dispatch(resetStatus());
        setAddModalShow(true);
    };

    const budgets = useMemo(() => {
        const openDetailsModal = (id) => () => {
            dispatch(budgetDetail(id));
            setDetailModalShow(true);
        };

        const openEditModal = (budget) => () => {
            setFormData(budget);
            dispatch(resetStatus());
            setEditModalShow(true);
        };

        const handleDeleteBudget = (id) => () => {
            dispatch(budgetDelete(id));
        };

        return all.map((budget) => ({
            id: budget.id,
            category: budget.category,
            amount: "₹ " + Number(budget.amount).toLocaleString("en-IN"),
            date: budget.date,
            operations: (
                <Dropdown toggleButton={<button className="actions">☰</button>}>
                    <button type="button" onClick={openDetailsModal(budget.id)}>
                        📋 <span>Details</span>
                    </button>
                    <button type="button" onClick={openEditModal(budget)}>
                        ✏️ <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteBudget(budget.id)}
                    >
                        🗑️ <span>Delete</span>
                    </button>
                </Dropdown>
            ),
        }));
    }, [all, dispatch]);

    return (
        <section className="budget">
            <Modal
                showModal={addModalShow}
                toggle={() => setAddModalShow(!addModalShow)}
            >
                <h2>Add New Budget</h2>
                <form className="form" onSubmit={handleAddBudget}>
                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Submit
                    </Button>
                    {status === "succeeded" && (
                        <p style={{ color: "var(--color-success)" }}>✔ Added</p>
                    )}
                    {status === "failed" && (
                        <p style={{ color: "var(--color-danger)" }}>
                            ✖ {error}
                        </p>
                    )}
                </form>
            </Modal>

            <Modal
                showModal={detailModalShow}
                toggle={() => setDetailModalShow(!detailModalShow)}
            >
                <div className="detail-container">
                    <h2 className="detail-title">Budget Details</h2>
                    <p>
                        <span className="detail-tag">id</span>
                        <span className="detail-value">{details.id}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Category</span>
                        <span className="detail-value">{details.category}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Amount</span>
                        <span className="detail-value">₹{details.amount}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Date</span>
                        <span className="detail-value">{details.date}</span>
                    </p>
                </div>
            </Modal>

            <Modal
                showModal={editModalShow}
                toggle={() => setEditModalShow(!setEditModalShow)}
            >
                <h2>Edit Existing Budget</h2>
                <form className="form" onSubmit={handleEditBudget}>
                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Submit
                    </Button>
                    {status === "succeeded" && (
                        <p style={{ color: "var(--color-success)" }}>
                            ✔ Updated
                        </p>
                    )}
                    {status === "failed" && (
                        <p style={{ color: "var(--color-danger)" }}>
                            ✖ {error}
                        </p>
                    )}
                </form>
            </Modal>

            <Button variant="success" onClick={openAddModal}>
                ➕Add
            </Button>
            <Table columns={columns} data={budgets} />
        </section>
    );
};

export default Budget;
