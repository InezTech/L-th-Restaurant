import React from "react";
import TablesListItem from "./TablesListItem";

const TablesList = ({ tables, finishButtonHandler }) => {
  return (
    <div className="tables-grid-container mt-3">
      <div className="row g-3">
        {tables.map(table => (
          <div key={table.table_id} className="col-6 col-sm-6">
            <TablesListItem
              table={table}
              finishButtonHandler={finishButtonHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesList;
