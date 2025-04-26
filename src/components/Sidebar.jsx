import { Link } from 'react-router-dom';
import { FaUsers, FaFileAlt, FaUserShield, FaKey, FaUser } from 'react-icons/fa';

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside
            className={`bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'
                } md:w-64 md:static z-50 overflow-hidden`}
        >
            <div className="p-4 flex justify-between items-center md:hidden">
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                <button onClick={toggleSidebar} className="text-white">
                    ✕
                </button>
            </div>
            <nav className="mt-4">
                <Link
                    to="/admin/users"
                    className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                >
                    <FaUsers className="mr-2" /> Users
                </Link>
                <Link
                    to="/admin/articles"
                    className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                >
                    <FaFileAlt className="mr-2" /> Articles
                </Link>
                <Link
                    to="/admin/roles"
                    className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                >
                    <FaUserShield className="mr-2" /> Roles
                </Link>
                <Link
                    to="/admin/permissions"
                    className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                >
                    <FaKey className="mr-2" /> Permissions
                </Link>
                <Link
                    to="/profile"
                    className="flex items-center p-4 hover:bg-gray-700 transition-colors"
                >
                    <FaUser className="mr-2" /> Profile
                </Link>
            </nav>
        </aside>
    );
}