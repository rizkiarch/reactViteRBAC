import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, token } = await register(formData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            alert('Registration failed');
            console.error('Registration error:', error);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                        <h1 className="text-2xl font-bold mb-6">Register</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
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
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.password_confirmation || ''}
                                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                            />
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}