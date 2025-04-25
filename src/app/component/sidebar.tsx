"use client"; 
import Image from "next/image"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Cog,  Gem, Menu } from 'lucide-react';
import Theme from "./theme";
const Sidebar = () => {
  const [isopen,setisopen]= useState(true)

  return (
    <div className='flex flex-col min-h-screen p-2 bg-zinc-900'>
      <div> 
        <Menu
        onClick={()=>setisopen(!isopen)}
        className="text-slate-100"/>
      </div>
      
      
      <div className=" bg-zinc-950 flex h-20 py-2 px-1 mt-2 rounded-full  ">
      {isopen?(
      <div  className="flex rounded-full justify-center items-center w-full h-full p-2 bg-black">
        <p className="text-slate-100">Hey there! I’m here to help</p>
            </div>):(null)}
      </div>
      {/* <div className="grow"></div> */}
      {isopen?(
      <div className="grow p-2">
        <button className="flex items-center text-slate-100 gap-1 bg-zinc-900 rounded-xl p-1 "><Gem size={15} />Recent will be here  </button>
      </div>):(
        <div className="grow p-2 flex justify-center ">
        <Gem size={15} className="text-white"/>
        </div>)}
      <div>
      {isopen?(
        <div className="flex rounded-full bg-zinc-900  w-[200px] mb-3 p-2 text-slate-100  gap-1">
        <Cog /><Theme/>
        </div> ):(<div className="p-1 flex justify-center"><Cog className="text-slate-100 cursor-pointer mb-3"/></div>)} 
        </div>
    </div>
  )
}

export default Sidebar
