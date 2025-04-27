import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Search, Bell, Sun, Moon, ChevronDown, SearchCheck, SearchIcon } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* <nav className="bg-gray-800 p-6">
                <div className="container mx-auto flex justify-between items-center max-w-7xl">
                    <Link to="/" className="text-white text-2xl font-bold">
                        Blog App
                    </Link>
                    <div className="space-x-6">
                        <Link to="/" className="text-white hover:text-gray-300 text-lg">
                            Articles
                        </Link>
                        {token && user?.roles?.some((role) => ['admin', 'superadmin'].includes(role.name)) && (
                            <Link to="/admin" className="text-white hover:text-gray-300 text-lg">
                                Dashboard
                            </Link>
                        )}
                        {token ? (
                            <>
                                <Link to="/profile" className="text-white hover:text-gray-300 text-lg">
                                    Profile
                                </Link>
                                <Button variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-300 text-lg">
                                    Login
                                </Link>
                                <Link to="/register" className="text-white hover:text-gray-300 text-lg">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav> */}

            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white dark:bg-gray-900 shadow-md"
                    : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-2">B</div>
                            <span className="font-bold text-xl">BlogApp</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Home</Link>
                            {token ? (
                                <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Dashboard</Link>
                            ) : null}
                        </nav>

                        {/* Search bar - Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className={`relative transition-all duration-300 ${isSearchOpen ? "w-64" : "w-10"}`}>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search size={18} className="text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    className={`bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isSearchOpen ? "w-full opacity-100" : "w-10 opacity-0"
                                        }`}
                                    placeholder="Search articles..."
                                />
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <span className="sr-only">Toggle search</span>
                                </button>
                            </div>

                            {/* Notification Bell */}
                            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* User Profile */}
                            {token ? (
                                <>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src="https://github.com/shadcn.png"
                                                alt="User profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className=" text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                                        Login
                                    </Link>
                                    <Link to="/register" className=" text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden items-center space-x-4">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Search size={20} className="text-gray-700 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {isMenuOpen ? (
                                    <X size={24} className="text-gray-700 dark:text-gray-300" />
                                ) : (
                                    <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className={`px-4 pb-4 ${isSearchOpen ? "block" : "hidden"} md:hidden`}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={18} className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search articles..."
                        />
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>

                        {token ? (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
                        ) : null}

                        <div className="flex items-center justify-between px-3 py-2">
                            <div className="flex items-center space-x-4">
                                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                            </div>

                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                        src="/api/placeholder/40/40"
                                        alt="User profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">User</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}