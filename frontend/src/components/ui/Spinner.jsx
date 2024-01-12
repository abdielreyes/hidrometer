import React from 'react'

import { HashLoader } from "react-spinners";
const styleParent = {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.8)",
}
const styleChild = {
    "position": "relative",
    "top": "35vh",
    "left": "50%",
    zIndex: 9999
}
function Spinner({ loading }) {
    return (
        <div style={loading ? styleParent : {}}>

            <HashLoader style={styleChild} color="#caf0f8" loading={loading} />


        </div>
    )
}

export default Spinner