import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
{ name: "Road", issues: 4 },
{ name: "Garbage", issues: 3 },
{ name: "Water", issues: 2 },
{ name: "Light", issues: 5 }
];

function IssueChart(){

return(

<div style={{background:"white",padding:"20px",borderRadius:"10px"}}>

<h3>Issue Analytics</h3>

<BarChart width={400} height={250} data={data}>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="issues" fill="#2563eb"/>
</BarChart>

</div>

);

}

export default IssueChart;