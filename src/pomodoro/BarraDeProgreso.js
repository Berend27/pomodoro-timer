import React from "react";

function BarraDeProgreso({ aria }) {
    return (
        <div className="progress" style={{ height: "20px" }}>
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={aria} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width:`${aria}%` }} 
            />
        </div>
    );
}

export default BarraDeProgreso;