import React from "react";
import styles from "./styles.module.scss";
const Table = ({ tableHeader, tableData, onClickDataRow = () => false }) => {
  return (
    <div className={styles.table_wrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table_header_row}>
            {tableHeader.map((value, idx) => (
              <th key={idx}>{value}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((value, idx) => (
            <tr
              onClick={() => onClickDataRow(value)}
              className={styles.table_data_row}
              key={idx}
            >
              {Object.values(value)
                .slice(0, Object.values(value).length - 1)
                .map((data, idx) => (
                  <td
                    style={{
                      color: data.includes("-")
                        ? " #ff1f1f"
                        : data.includes("+")
                        ? "#28f428"
                        : "",
                    }}
                    key={idx}
                  >
                    {data}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
