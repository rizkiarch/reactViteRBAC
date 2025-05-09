import { Route, Routes } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import AdminDashboard from './pages/AdminDashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RoleManagementPage from './pages/RoleManagementPage'
import PermissionManagementPage from './pages/PermissionManagementPage'
import UserManagement from './pages/UserManagement'
import ArticleManagement from './pages/ArticleManagement'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<ArticlePage />} />
      <Route path="/admin/*" element={<DashboardPage />}>
        <Route path="users" element={<UserManagement />} />
        <Route path="articles" element={<ArticleManagement />} />
        <Route path="roles" element={<RoleManagementPage />} />
        <Route path="permissions" element={<PermissionManagementPage />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}


