"use client";
import { IoLogoGoogle } from "react-icons/io";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const Login = () => {
 const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const supabase = createClient();

  // Function to handle validation and submission for email/password signup
  const validateAndSubmit = async () => {
    const emailValid = email.includes("@");
    const passwordValid = password.length >= 8;
    if (!emailValid || !passwordValid) {
      setError("Invalid email or password (min 8 characters)");
      return;
    }
    try {
      // Insert user data into Supabase
      await supabase.from("users").insert([{ mail: email, password: password }]);
      // Set welcome message visibility
      setShowWelcome(true);
      setTimeout(() => router.push("/dashboard"), 3000); // Redirect after 2s
    } catch (error) {
      console.log(error)
      setError("An error occurred");
    }
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  // Check if session is available and trigger welcome animation
  useEffect(() => {
    if (session) {
      setShowWelcome(true);
      setTimeout(() => router.push("/dashboard"), 2000); // Redirect after 2s
    }
  }, [session, router]);

  return (
    <div>
      {session ? (
        <>
          {showWelcome ? (
            <h1 className=" animate-bounce hover:paused text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-yellow-600 font-semibold">
              Welcome back, {session.user?.name}!
            </h1>
          ) : (
            <Image src={session.user?.image as string} width={50} height={50} alt="" />
          )}
          {/* <button
            className="text-1xl font-mono font-semibold p-2 rounded-xl bg-black text-yellow-600"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button> */}
        </>
      ) : (
        <div className="animate-bounce hover:paused bg-black rounded-3xl h-[400px] w-[350px]">
          <div>
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold text-teal-50 p-4">
                Create an account
                <br />
                <span className="text-sm text-white">
                  Enter your email and password below
                </span>
              </h1>
            </div>
            <div className="flex justify-center">
              <button
                className="flex justify-center items-center gap-1 ring-2 ring-white-500 ring-offset-4 ring-offset-blue-500 rounded-md text-white p-2 font-light"
                onClick={handleGoogleSignIn}
              >
                <IoLogoGoogle /> Sign In With Google
              </button>
            </div>
            <div className="flex justify-center p-5 text-white text-xs">
              <p>------- OR CONTINUE WITH -------</p>
            </div>
            <div className="flex justify-center p-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-72  bg-black text-white rounded-full border"
              />
            </div>
            <div className="flex justify-center p-2 ">
              <Input
              className="w-72 bg-black rounded-full border  "
              placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="flex justify-center text-red-500 ">{error}</div>
            )}
            <div className="flex justify-center p-3">
              <button
                className="p-2 rounded-full w-[150px] border text-white"
                onClick={validateAndSubmit}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;



// "use client"
// import { IoLogoGoogle } from "react-icons/io";
// import React, { useState } from 'react'
// import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import {signIn, signOut, useSession} from "next-auth/react"
// import { createClient } from "../utils/supabase/client";
// const Login = () => {
//     const {data:session}=useSession()
//     const [email,setemail]=useState<string>("")
//     const [password,setpassword]=useState<string>("") 
//     const[error,setError] =useState<string>("")
//     // 
//     const validateAndSubmit = async()=>{
//         const supabase = createClient()
//       const emailValid = email.includes("@")
//       const passwordvalid= password.length >= 8
//       if(!emailValid || !passwordvalid){
//         setError ("invalid email or password (min 8 characters) ")
//         return
//       }
//       try{
//        await supabase.from("users").insert([{
//           mail:email,
//           password:password
//         }])
//       }
//       catch (err){
//         setError("an error occured")
//       }
//     }
//   return (
    
//     <div>
//       {session ? (
//         <>
//         <Image src={session.user?.image as string} width={50} height={50} alt=''></Image>
//         <h1 className='text-2xl font-mono font-semibold'>welcome back {session.user?.name}</h1>
//         <button className='text-2xl font-mono font-semibold' onClick={()=>signOut({callbackUrl:"/"})}>Sign out </button>
//         </>
//       ):(

//         <div className=' hidden lg:block border rounded-2xl h-[400px] w-[350px] '>
//           <div>
//             <div className="flex justify-center">
//           <h1 className='text-2xl font-semibold text-teal-50 p-4'>
//             Create an account 
//             <br />
//             <span className="text-sm text-white ">Enter your email and password below </span>
//         </h1>
//         </div>
//         <div className='flex justify-center'>
//         <button className='flex justify-center items-center gap-1 ring-2 ring-white-500 ring-offset-4 ring-offset-blue-500 rounded-md text-white p-2 font-light' onClick={()=>signIn("google")}><IoLogoGoogle /> SignIn With Google </button>
//         </div>
//         <div className="flex justify-center p-2 text-white text-xs">
//           <p>------- OR CONTINUE WITH -------</p>
//         </div>
//         <div className="flex justify-center p-1">
//         <p className="text-white">Email</p>
//         </div>
//         <div className=" flex justify-center">
//         <Input id="email" type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="w-72 bg-black text-white"   />
//         </div>
//         <div className="flex justify-center p-1">
//         <p className="text-white">Password</p>
//         </div>
//         <div className=" flex justify-center">
//         <Input id="password" type="password" value={password} onChange={(p)=> setpassword(p.target.value)} className="w-72 bg-black text-white"  />
//         </div>
//         {error && <div className="flex justify-center text-red-500 ">{error}</div>}
//         <div className="flex justify-center p-3">
//           <button className="p-2 rounded-full w-[250px] bg-white text-black " onClick={(validateAndSubmit)}>Create Account</button>
//         </div>
//           </div>
//         </div>
//       )
//       }
//     </div>
//   )
// }

// export default Login




// "use client"
// import { IoLogoGoogle } from "react-icons/io";
// import React, { useState } from 'react';
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { createClient } from "../utils/supabase/client";

// const Dashboard = () => {
//   const { data: session } = useSession();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const validateAndSubmit = async () => {
//     const supabase = createClient()
//     // Email validation (includes '@')
//     const emailValid = email.includes("@");
//     // Password validation (min 8 characters)
//     const passwordValid = password.length >= 8;

//     if (!emailValid && !passwordValid) {
//       setError("Invalid email or password (min 8 characters).");
//       return;
//     }

//     try {
//       // Save data in the database via POST request
//       await supabase.from("users").insert({
//         email,password})
//       // Redirect or update the session as needed
//       setError("");
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="hello">
//       {session ? (
//         <>
//           <Image src={session.user?.image as string} width={50} height={50} alt='' />
//           <h1 className='text-2xl font-mono font-semibold'>Welcome back {session.user?.name}</h1>
//           <button className='text-2xl font-mono font-semibold' onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
//         </>
//       ) : (
//         <div className='hidden md:block border rounded-2xl h-[400px] w-[350px]'>
//           <div>
//             <div className="flex justify-center">
//               <h1 className='text-2xl font-semibold text-teal-50 p-4'>
//                 Create an account 
//                 <br />
//                 <span className="text-sm text-white ">Enter your email and password below </span>
//               </h1>
//             </div>
//             <div className='flex justify-center'>
//               <button className='flex justify-center items-center gap-1 ring-2 ring-white-500 ring-offset-4 ring-offset-blue-500 rounded-md text-white p-2 font-light' onClick={() => signIn("google")}>
//                 <IoLogoGoogle /> SignIn With Google
//               </button>
//             </div>
//             <div className="flex justify-center p-2 text-white text-xs">
//               <p>------- OR CONTINUE WITH -------</p>
//             </div>
//             <div className="flex justify-center p-1">
//               <p className="text-white">Email</p>
//             </div>
//             <div className="flex justify-center">
//               <Input id="email" className="w-72 bg-black text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="flex justify-center p-1">
//               <p className="text-white">Password</p>
//             </div>
//             <div className="flex justify-center">
//               <Input id="password" type="password" className="w-72 bg-black text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             {error && <div className="text-red-500 text-center mt-2">{error}</div>}
//             <div className="flex justify-center p-3">
//               <button className="p-2 rounded-full w-[250px] bg-white text-black" onClick={validateAndSubmit}>Create Account</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;