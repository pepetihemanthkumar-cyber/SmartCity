import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaMap, FaExclamationTriangle, FaMoon } from "react-icons/fa";

function AdminLayout({ children }) {

return(

<div style={{display:"flex",minHeight:"100vh"}}>

{/* SIDEBAR */}

<div style={{
width:"220px",
background:"#111827",
color:"white",
padding:"25px"
}}>

<h2 style={{marginBottom:"30px"}}>SmartCity</h2>

<Link style={link} to="/dashboard">
<FaChartPie/> Dashboard
</Link>

<Link style={link} to="/map">
<FaMap/> City Map
</Link>

<Link style={link} to="/report">
<FaExclamationTriangle/> Report Issue
</Link>

<button style={darkButton}>
<FaMoon/> Dark Mode
</button>

</div>


{/* MAIN CONTENT */}

<div style={{flex:1,background:"#f4f6fb"}}>
{children}
</div>

</div>

);

}

const link = {
display:"flex",
alignItems:"center",
gap:"10px",
color:"white",
textDecoration:"none",
marginBottom:"20px",
fontSize:"16px"
};

const darkButton = {
marginTop:"20px",
padding:"10px",
background:"#374151",
color:"white",
border:"none",
cursor:"pointer",
width:"100%"
};

export default AdminLayout;