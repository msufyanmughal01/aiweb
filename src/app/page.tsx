"use client";
import Sidebar from "./component/sidebar";
import Chatbot from "./component/chat";

export default function Dashboard() {
  return (
    <section>
        <div className="flex contain">
          <Sidebar/>
          <Chatbot />
          </div>
    </section>
  )
}