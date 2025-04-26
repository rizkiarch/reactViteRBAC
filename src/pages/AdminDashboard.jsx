import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./UserManagement";
import ArticleManagement from "./ArticleManagement";
import { FaBars } from 'react-icons/fa';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="md:hidden p-4">
                    <button onClick={toggleSidebar} className="text-gray-800">
                        <FaBars size={24} />
                    </button>
                </div>
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="users" element={<UserManagement />} />
                        <Route path="articles" element={<ArticleManagement />} />
                        <Route path="/" element={<h1 className="text-2xl">Welcome to Admin Dashboard</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );

}