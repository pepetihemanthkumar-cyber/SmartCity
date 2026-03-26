import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function Login() {

  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🎆 Firecracker animation
  const fireCrackers = () => {

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {

      confetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
      });

      confetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }

    })();

  };


  const handleSubmit = () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);
      setSuccess(true);

      // 🎆 trigger crackers
      fireCrackers();

      setTimeout(() => {
        navigate("/home");
      }, 3500);

    }, 2000);

  };

  return (

<div className="h-screen w-screen flex overflow-hidden">

{success && <Confetti width={window.innerWidth} height={window.innerHeight} />}

{/* LEFT IMAGE */}

<div className="w-1/2 h-full relative overflow-hidden">

<img
src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
alt="city"
className="absolute w-full h-full object-cover scale-110 animate-[zoom_25s_linear_infinite]"
/>

<div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/40 to-black"></div>

<div className="absolute bottom-20 left-16 text-white text-6xl font-extrabold tracking-widest">
CITYCONNECT
</div>

</div>


{/* RIGHT FORM */}

<div className="w-1/2 h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-black">

<div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-[160px] opacity-40 animate-pulse top-10 left-20"></div>
<div className="absolute w-[400px] h-[400px] bg-blue-600 rounded-full blur-[160px] opacity-40 animate-pulse bottom-10 right-10"></div>


<div className="w-[430px] backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 text-white">

<h2 className="text-4xl font-bold mb-6 text-center">

{success
? (isLogin ? "🎉 Congratulations! Logged In!" : "🎉 Congratulations! Account Created!")
: (isLogin ? "Login" : "Create an account")}

</h2>


{/* USER ADMIN SWITCH */}

{isLogin && (

<div className="flex gap-4 mb-6 justify-center">

<button
onClick={() => setRole("user")}
className={`px-4 py-2 rounded ${role==="user" ? "bg-purple-600":"bg-gray-700"}`}
>
User Login
</button>

<button
onClick={() => setRole("admin")}
className={`px-4 py-2 rounded ${role==="admin" ? "bg-purple-600":"bg-gray-700"}`}
>
Admin Login
</button>

</div>

)}


{/* SIGNUP FIELDS */}

{!isLogin && (

<div className="flex gap-4 mb-4">

<input
type="text"
placeholder="First name"
className="w-1/2 p-3 rounded bg-gray-800"
/>

<input
type="text"
placeholder="Last name"
className="w-1/2 p-3 rounded bg-gray-800"
/>

</div>

)}


{/* EMAIL */}

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 rounded bg-gray-800 mb-4"
/>


{/* PASSWORD */}

<div className="relative">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded bg-gray-800 mb-4"
/>

<span
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-3 cursor-pointer"
>

{showPassword ? <FaEyeSlash/> : <FaEye/>}

</span>

</div>


{/* TERMS */}

{!isLogin && (

<div className="flex items-center mb-5 text-sm">

<input type="checkbox" className="mr-2"/>
I agree to the Terms & Conditions

</div>

)}


{/* BUTTON */}

<button
onClick={handleSubmit}
className="w-full bg-gradient-to-r from-purple-600 to-purple-500 p-3 rounded font-semibold hover:scale-105 transition flex justify-center"
>

{loading ? "Loading..." : (isLogin ? `Login as ${role}` : "Create account")}

</button>


{/* LOGIN SWITCH */}

<p className="text-center text-gray-400 mt-6">

{isLogin ? "Don't have an account?" : "Already have an account?"}

<span
onClick={() => setIsLogin(!isLogin)}
className="text-purple-400 cursor-pointer ml-2"
>

{isLogin ? "Sign Up" : "Login"}

</span>

</p>


{/* SOCIAL LOGIN */}

<div className="flex gap-4 mt-6">

<button className="w-1/3 flex items-center justify-center gap-2 border border-gray-600 p-3 rounded hover:bg-gray-800">
<FaGoogle className="text-red-500"/> Google
</button>

<button className="w-1/3 flex items-center justify-center gap-2 border border-gray-600 p-3 rounded hover:bg-gray-800">
<FaApple/> Apple
</button>

<button className="w-1/3 flex items-center justify-center gap-2 border border-gray-600 p-3 rounded hover:bg-gray-800">
<FaFacebookF className="text-blue-500"/> Facebook
</button>

</div>

</div>

</div>

</div>

  );
}

export default Login;