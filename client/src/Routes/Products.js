import React from "react";
import SimpleList from "../components/SimpleList";
import SimpleTable from "../components/SimpleTable";

function Products() {

    return (
        <div className="mainContainer">
            <SimpleTable />
            <SimpleList />
            <SimpleTable />
            <SimpleList />
        </div>
    )
}

export default Products;