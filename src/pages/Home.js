import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){

const navigate = useNavigate();

return(

<div style={{fontFamily:"Arial, sans-serif"}}>

{/* HERO */}

<div style={heroSection}>

<h1 style={heroTitle}>Smart City Platform</h1>

<p style={heroText}>
A modern digital platform to manage city infrastructure, report issues
and monitor urban services in real time.
</p>

<div style={{display:"flex",gap:"20px",flexWrap:"wrap",justifyContent:"center"}}>

<button onClick={()=>navigate("/dashboard")} style={heroButton}>
Explore Dashboard
</button>

<button onClick={()=>navigate("/report")} style={heroButtonOutline}>
Report Issue
</button>

</div>

</div>


{/* STATS */}

<div style={statsSection}>

<Stat title="Cities Connected" value="150+" />
<Stat title="Issues Resolved" value="12K+" />
<Stat title="Active Citizens" value="5K+" />

</div>


{/* ABOUT */}

<div style={aboutSection}>

<div style={{flex:1,minWidth:"300px"}}>

<h2 style={{fontSize:"40px"}}>
Shaping the Future of Cities
</h2>

<p style={aboutText}>
Our Smart City platform enables governments and citizens to collaborate
in solving urban issues through mapping, reporting, and analytics dashboards.
Cities become cleaner, safer and more efficient.
</p>

</div>

<img
src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
alt="city"
style={aboutImage}
/>

</div>


{/* SERVICES */}

<div style={servicesSection}>

<h2 style={servicesTitle}>
Smart City Services
</h2>

<div style={servicesGrid}>

<ServiceCard icon="📊" title="Dashboard"
desc="Monitor city problems and service statistics."
action={()=>navigate("/dashboard")} />

<ServiceCard icon="🗺️" title="City Map"
desc="Visualize reported issues across the city."
action={()=>navigate("/map")} />

<ServiceCard icon="🚨" title="Report Issue"
desc="Citizens can report garbage, road damage or leaks."
action={()=>navigate("/report")} />

<ServiceCard icon="🔐" title="Login"
desc="Secure access to the Smart City system."
action={()=>navigate("/")} />

</div>

</div>


{/* CTA */}

<div style={ctaSection}>

<h2 style={{fontSize:"40px"}}>
Building Smarter Cities Together
</h2>

<p style={{marginTop:"15px"}}>
Join thousands of citizens improving urban life.
</p>

<button onClick={()=>navigate("/report")} style={ctaButton}>
Start Reporting
</button>

</div>


{/* FOOTER */}

<div style={footer}>

<h3>Smart City Platform</h3>

<p style={{marginTop:"10px"}}>
© 2026 Smart City Management System
</p>

<div style={{marginTop:"15px",display:"flex",gap:"20px",justifyContent:"center"}}>

<span style={footerLink} onClick={()=>navigate("/dashboard")}>Dashboard</span>
<span style={footerLink} onClick={()=>navigate("/map")}>Map</span>
<span style={footerLink} onClick={()=>navigate("/report")}>Report</span>
<span style={footerLink} onClick={()=>navigate("/")}>Login</span>

</div>

</div>

</div>

);

}


/* COMPONENTS */

function Stat({title,value}){
return(
<div>
<h1 style={{fontSize:"40px"}}>{value}</h1>
<p>{title}</p>
</div>
);
}


function ServiceCard({icon,title,desc,action}){

return(

<div
className="card"
onClick={action}
style={{
padding:"35px",
textAlign:"center",
cursor:"pointer",
transition:"0.3s"
}}
onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-8px)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
}}
>

<h1>{icon}</h1>
<h3>{title}</h3>
<p style={{color:"inherit"}}>{desc}</p>

</div>

);

}


/* STYLES */

const heroSection={
height:"90vh",
backgroundImage:"linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f)",
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
color:"inherit",
textAlign:"center",
padding:"20px"
};

const heroTitle={
fontSize:"70px",
marginBottom:"10px"
};

const heroText={
fontSize:"20px",
maxWidth:"700px",
lineHeight:"1.6",
marginBottom:"30px"
};

const statsSection={
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"60px",
padding:"60px",
textAlign:"center",
background:"inherit"   // ✅ FIX
};

const aboutSection={
display:"flex",
flexWrap:"wrap",
alignItems:"center",
gap:"40px",
padding:"80px"
};

const aboutText={
marginTop:"20px",
color:"inherit",
lineHeight:"1.7"
};

const aboutImage={
width:"500px",
maxWidth:"100%",
borderRadius:"12px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
};

const servicesSection={
padding:"80px",
background:"inherit"   // ✅ FIX
};

const servicesTitle={
textAlign:"center",
marginBottom:"60px",
fontSize:"40px"
};

const servicesGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"35px"
};

const ctaSection={
padding:"80px",
background:"linear-gradient(135deg,#2563eb,#1e40af)",
color:"white",
textAlign:"center"
};

const ctaButton={
marginTop:"25px",
padding:"12px 35px",
fontSize:"16px",
border:"none",
borderRadius:"6px",
background:"white",
color:"#2563eb",
cursor:"pointer"
};

const footer={
padding:"40px",
textAlign:"center",
background:"inherit",   // ✅ FIX
color:"inherit"         // ✅ FIX
};

const footerLink={
cursor:"pointer"
};

const heroButton={
padding:"12px 30px",
fontSize:"16px",
border:"none",
borderRadius:"6px",
background:"#2563eb",
color:"white",
cursor:"pointer"
};

const heroButtonOutline={
padding:"12px 30px",
fontSize:"16px",
border:"2px solid white",
borderRadius:"6px",
background:"transparent",
color:"white",
cursor:"pointer"
};

export default Home;