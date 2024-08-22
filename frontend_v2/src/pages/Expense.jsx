import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table from "../components/Table";
import {
    expenseAdd,
    expenseAll,
    expenseDelete,
    expenseDetail,
    expenseUpdate,
    resetStatus,
} from "../redux/expense/expenseSlice";
import "./Expense.css";

const columns = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount(₹)" },
    { key: "operations", label: "" },
];

const Expense = () => {
    const dispatch = useDispatch();
    const { all, status, error, detail } = useSelector(
        (state) => state.expense
    );

    useEffect(() => {
        dispatch(expenseAll());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        category: "",
        amount: "",
        description: "",
    });

    const [addModalShow, setAddModalShow] = useState(false);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const handleAddExpense = (event) => {
        event.preventDefault();
        dispatch(
            expenseAdd({
                ...formData,
                date: new Date().toISOString().split("T")[0],
            })
        );
        dispatch({
            category: "",
            amount: "",
            description: "",
        });
    };

    const handleEditExpense = (event) => {
        event.preventDefault();
        dispatch(expenseUpdate({ id: formData.id, payload: formData }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        setFormData({
            category: "",
            amount: "",
            description: "",
        });
        dispatch(resetStatus());
        setAddModalShow(true);
    };

    const expenses = useMemo(() => {
        const openDetailsModal = (id) => () => {
            dispatch(expenseDetail(id));
            setDetailModalShow(true);
        };

        const openEditModal = (expense) => () => {
            setFormData(expense);
            dispatch(resetStatus());
            setEditModalShow(true);
        };

        const handleDeleteExpense = (id) => () => {
            dispatch(expenseDelete(id));
        };

        return all.map((expense) => ({
            id: expense.id,
            date: expense.date,
            category: expense.category,
            amount: "₹ " + Number(expense.amount).toLocaleString("en-IN"),
            operations: (
                <Dropdown toggleButton={<button className="actions">☰</button>}>
                    <button
                        type="button"
                        onClick={openDetailsModal(expense.id)}
                    >
                        📋 <span>Details</span>
                    </button>
                    <button type="button" onClick={openEditModal(expense)}>
                        ✏️ <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteExpense(expense.id)}
                    >
                        🗑️ <span>Delete</span>
                    </button>
                </Dropdown>
            ),
        }));
    }, [all, dispatch]);

    return (
        <section className="expense">
            <Modal
                showModal={addModalShow}
                toggle={() => setAddModalShow(!addModalShow)}
            >
                <h2>Add New Expense</h2>
                <form className="form" onSubmit={handleAddExpense}>
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
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                    <h2>Expense Details</h2>
                    <p>
                        <span className="detail-tag">id</span>
                        <span className="detail-value">{detail.id}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Category</span>
                        <span className="detail-value">{detail.category}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Amount</span> ₹
                        <span className="detail-value">{detail.amount}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Date</span>
                        <span className="detail-value">{detail.date}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Description</span>
                        <span className="detail-value">{`${
                            detail.description || "N/A"
                        }`}</span>
                    </p>
                </div>
            </Modal>

            <Modal
                showModal={editModalShow}
                toggle={() => setEditModalShow(!editModalShow)}
            >
                <h2>Edit Expense</h2>
                <form className="form" onSubmit={handleEditExpense}>
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
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                ➕ Add
            </Button>
            <Table columns={columns} data={expenses} />
        </section>
    );
};

export default Expense;
