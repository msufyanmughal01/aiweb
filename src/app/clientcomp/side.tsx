"use client"
import { usePathname } from 'next/navigation';
import Sidebar from '../component/sidebar';
export default function Side(){
const links ={
        name:"dashboad",
        href:"/dashboard"
   }
 const router = usePathname()
    return(
        <div>
            {router === links.href?(<Sidebar/>):(null)}
        </div>
    )
}
