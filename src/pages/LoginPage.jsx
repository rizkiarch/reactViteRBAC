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
            <div className="min-h-screen bg-gray-100 min-w-[1024px]">
                <Navbar />
                <div className="h-16"></div>

                <div className="container mx-auto py-12 px-8">
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
                        <h1 className="text-3xl font-bold mb-8">Login</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}