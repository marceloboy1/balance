import React from "react";
import SimpleTable from "../components/SimpleTable";
import TestForm from "../components/TestForm";

function Home() {
    return (
        <div className="home">
            <TestForm/>
            <SimpleTable />
        </div>
    )
}

export default Home;