import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(user.id, formData);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Profile updated successfully');
            navigate('/');
        } catch (error) {
            alert('Failed to update profile');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
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
                            placeholder="New Password (optional)"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Button type="submit" className="w-full">
                            Update Profile
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}