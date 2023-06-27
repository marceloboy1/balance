import React from "react";
import SimpleList from "../components/SimpleList";
import SimpleTable from "../components/SimpleTable";
import GastosTable from "../components/GastosTable";

function Products() {

    return (
        <div className="mainContainer">
            <SimpleTable />
            <SimpleList />
            
            <SimpleList />
        </div>
    )
}

export default Products;