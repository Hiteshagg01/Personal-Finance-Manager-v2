import "./Table.css";

const Table = ({ columns = [], data = [] }) => {
    const renderHeaders = () => {
        return (
            <tr>
                {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                ))}
            </tr>
        );
    };

    const renderRows = () => {
        return data.map((row) => (
            <tr key={row.id}>
                {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                ))}
            </tr>
        ));
    };

    return (
        <>
            <table className="table">
                <thead>{renderHeaders()}</thead>
                <tbody>{renderRows()}</tbody>
            </table>

            {!data.length && (
                <p style={{ fontStyle: "italic", padding: "1rem" }}>
                    No data to display
                </p>
            )}
        </>
    );
};

export default Table;
