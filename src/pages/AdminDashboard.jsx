import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UserManagement from './UserManagement';
import ArticleManagement from './ArticleManagement';
import RoleManagementPage from './RoleManagementPage';
import PermissionManagementPage from './PermissionManagementPage';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 flex min-w-[1024px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="container mx-auto p-8">
                    <Routes>
                        <Route path="users" element={<UserManagement />} />
                        <Route path="articles" element={<ArticleManagement />} />
                        <Route path="roles" element={<RoleManagementPage />} />
                        <Route path="permissions" element={<PermissionManagementPage />} />
                        <Route path="/" element={<h1 className="text-2xl">Welcome to Admin Dashboard</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}