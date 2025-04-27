import { AppSidebar } from "../components/AppSidebar";
import { SiteHeader } from "../components/SiteHeader";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./UserManagement";
import ArticleManagement from "./ArticleManagement";
import RoleManagementPage from "./RoleManagementPage";
import PermissionManagementPage from "./PermissionManagementPage";
import ProfilePage from "./ProfilePage";

export default function DashboardPage() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset className="bg-white">
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="container mx-auto p-8">
                        <Routes>
                            <Route path="users" element={<UserManagement />} />
                            <Route path="articles" element={<ArticleManagement />} />
                            <Route path="roles" element={<RoleManagementPage />} />
                            <Route path="permissions" element={<PermissionManagementPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="/" element={<h1 className="text-2xl">Welcome to Admin Dashboard</h1>} />
                        </Routes>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}