import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import {
    investmentAdd,
    investmentDelete,
    investmentDetails,
    investmentFetch,
    investmentUpdate,
    resetStatus,
} from "../redux/investment/investmentSlice";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import Input from "../components/Input";

const columns = [
    { key: "purchaseDate", label: "Purchase Date" },
    { key: "assetType", label: "Asset Type" },
    { key: "amount", label: "Amount(₹)" },
    { key: "operations", label: "" },
];

const Investments = () => {
    const dispatch = useDispatch();
    const { all, status, detail, error } = useSelector(
        (state) => state.investment
    );

    useEffect(() => {
        dispatch(investmentFetch());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        assetType: "",
        amount: "",
        purchaseDate: "",
    });

    const [addModalShow, setAddModalShow] = useState(false);
    const [detailModalShow, setDetailModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const handleAddInvestment = (event) => {
        event.preventDefault();
        dispatch(investmentAdd(formData));
        setFormData({
            assetType: "",
            amount: "",
            purchaseDate: "",
            currentValue: "",
            description: "",
        });
    };

    const handleEditInvestment = (event) => {
        event.preventDefault();
        dispatch(investmentUpdate({ id: formData.id, payload: formData }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openAddModal = () => {
        setFormData({
            assetType: "",
            amount: "",
            purchaseDate: new Date().toISOString().split("T")[0],
            currentValue: "",
            description: "",
        });
        dispatch(resetStatus());
        setAddModalShow(true);
    };

    const investments = useMemo(() => {
        const openDetailsModal = (id) => () => {
            dispatch(investmentDetails(id));
            setDetailModalShow(true);
        };

        const openEditModal = (investment) => () => {
            setFormData(investment);
            dispatch(resetStatus());
            setEditModalShow(true);
        };

        const handleDeleteInvestment = (id) => () => {
            dispatch(investmentDelete(id));
        };

        return all.map((investment) => ({
            id: investment.id,
            purchaseDate: investment.purchaseDate,
            assetType: investment.assetType,
            amount: "₹ " + Number(investment.amount).toLocaleString("en-IN"),
            operations: (
                <Dropdown toggleButton={<button className="actions">☰</button>}>
                    <button
                        type="button"
                        onClick={openDetailsModal(investment.id)}
                    >
                        📋 <span>Details</span>
                    </button>
                    <button type="button" onClick={openEditModal(investment)}>
                        ✏️ <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteInvestment(investment.id)}
                    >
                        🗑️ <span>Delete</span>
                    </button>
                </Dropdown>
            ),
        }));
    }, [all, dispatch]);

    return (
        <section className="investment">
            <Modal
                showModal={addModalShow}
                toggle={() => setAddModalShow(!addModalShow)}
            >
                <h2>Add Investment</h2>
                <form className="form" onSubmit={handleAddInvestment}>
                    <Input
                        type="text"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                        required
                    />
                    <Input
                        type="text"
                        name="assetType"
                        value={formData.assetType}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="number"
                        name="amount"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="number"
                        name="currentValue"
                        min="0"
                        step="0.01"
                        value={formData.currentValue}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Add Investment
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
                    <h2>Investment Details</h2>
                    <p>
                        <span className="detail-tag">id</span>
                        <span className="detail-value">{detail.id}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Purchase Date</span>
                        <span className="detail-value">
                            {detail.purchaseDate}
                        </span>
                    </p>
                    <p>
                        <span className="detail-tag">Asset Type</span>
                        <span className="detail-value">{detail.assetType}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Amount</span>
                        <span className="detail-value">{detail.amount}</span>
                    </p>
                    <p>
                        <span className="detail-tag">Current Value</span>
                        <span className="detail-value">
                            {detail.currentValue || "N/A"}
                        </span>
                    </p>
                    <p>
                        <span className="detail-tag">Description</span>
                        <span className="detail-value">
                            {detail.description || "N/A"}
                        </span>
                    </p>
                </div>
            </Modal>

            <Modal
                showModal={editModalShow}
                toggle={() => setEditModalShow(!editModalShow)}
            >
                <h2>Edit Investment</h2>
                <br />
                <form className="form" onSubmit={handleEditInvestment}>
                    <Input
                        type="text"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                        required
                    />
                    <Input
                        type="text"
                        name="assetType"
                        value={formData.assetType}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="number"
                        name="amount"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="number"
                        name="currentValue"
                        min="0"
                        step="0.01"
                        value={formData.currentValue}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Button type="submit" loading={status === "loading"}>
                        Update Investment
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

            <Button variant="success" onClick={openAddModal}>
                ➕ Add
            </Button>
            <Table columns={columns} data={investments} />
        </section>
    );
};

export default Investments;
