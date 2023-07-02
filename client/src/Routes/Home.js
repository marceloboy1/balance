import React from "react";
import SimpleTable from "../components/SimpleTable";
import Teste from "../components/Teste";

function Home() {
    return (
        <div className="mainContainer">
            <Teste name="Marcelo" />
            <SimpleTable />
        </div>
    )
}

export default Home;