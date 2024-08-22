import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Table from "../components/Table";
import {
    incomeAdd,
    incomeAll,
    incomeDelete,
    incomeDetail,
    incomeUpdate,
    resetStatus,
} from "../redux/income/incomeSlice";

const columns = [
    { key: "date", label: "Date" },
    { key: "source", label: "Source" },
    { key: "amount", label: "Amount(₹)" },
    { key: "operations", label: "" },
];

const Income = () => {
    const dispatch = useDispatch();
    const { all, detail, status, error } = useSelector((state) => state.income);

    useEffect(() => {
        dispatch(incomeAll());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        source: "",
        amount: "",
        description: "",
    });

    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [detailModalShow, setDetailModalShow] = useState(false);

    const handleAddIncome = (event) => {
        event.preventDefault();
        dispatch(
            incomeAdd({
                ...formData,
                date: new Date().toISOString().split("T")[0],
            })
        );
        setFormData({
            source: "",
            amount: "",
            description: "",
        });
    };

    const handleEditIncome = (event) => {
        event.preventDefault();
        dispatch(incomeUpdate({ id: formData.id, payload: formData }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const openAddModal = () => {
        setFormData({
            source: "",
            amount: "",
            description: "",
        });
        dispatch(resetStatus());
        setAddModalShow(true);
    };

    const incomes = useMemo(() => {
        const openDetailsModal = (id) => () => {
            dispatch(incomeDetail(id));
            setDetailModalShow(true);
        };

        const openEditModal = (income) => () => {
            setFormData(income);
            dispatch(resetStatus());
            setEditModalShow(true);
        };

        const handleDeleteIncome = (id) => () => {
            dispatch(incomeDelete(id));
        };

        return all.map((income) => ({
            id: income.id,
            date: income.date,
            source: income.source,
            amount: "₹ " + Number(income.amount).toLocaleString("en-IN"),
            operations: (
                <Dropdown toggleButton={<button className="actions">☰</button>}>
                    <button type="button" onClick={openDetailsModal(income.id)}>
                        📋 <span>Details</span>
                    </button>
                    <button type="button" onClick={openEditModal(income)}>
                        ✏️ <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteIncome(income.id)}
                    >
                        🗑️ <span>Delete</span>
                    </button>
                </Dropdown>
            ),
        }));
    }, [all, dispatch]);

    return (
        <section className="income">
            <Modal
                showModal={addModalShow}
                toggle={() => setAddModalShow(!addModalShow)}
            >
                <h2>Add Income</h2>
                <form className="form" onSubmit={handleAddIncome}>
                    <Input
                        name="source"
                        value={formData.source}
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
                    <h2>Income Details</h2>
                    <p>
                        <span className="detail-tag">id</span>
                        <span className="detail detail-value">{detail.id}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Source</span>
                        <span className="detail detail-value">
                            {detail.source}
                        </span>
                    </p>
                    <p>
                        <span className="detail-tag">Amount</span>
                        <span className="detail detail-value">
                            ₹{detail.amount}
                        </span>
                    </p>
                    <p>
                        <span className="detail-tag">Date</span>
                        <span className="detail detail-value">
                            {detail.date}
                        </span>
                    </p>
                    <p>
                        <span className="detail-tag">Description</span>
                        <span className="detail detail-value">
                            {detail.description}
                        </span>
                    </p>
                </div>
            </Modal>

            <Modal
                showModal={editModalShow}
                toggle={() => setEditModalShow(!editModalShow)}
            >
                <h2>Edit Income</h2>
                <br />
                <form className="form" onSubmit={handleEditIncome}>
                    <Input
                        name="source"
                        value={formData.source}
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
            <Table columns={columns} data={incomes} />
        </section>
    );
};

export default Income;
