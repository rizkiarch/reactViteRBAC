import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, token } = await login(formData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            alert('Login failed');
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                        <h1 className="text-2xl font-bold mb-6">Login</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}