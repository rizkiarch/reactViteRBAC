import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Link } from 'react-router-dom';
import { useRoles } from '../hooks/useRoles';

export default function UserManagement() {
    const { users, isLoading, createUser, updateUser, deleteUser, assignRole } = useUsers();
    const { roles } = useRoles();
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });

    const user = JSON.parse(localStorage.getItem("user"))
    const userPermissions = user?.roles?.flatMap(role => role.permissions?.map(permission => permission.name)) || []

    const canManageRoles = userPermissions.includes('manage-roles');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editUser) {
            updateUser(
                { id: editUser.id, data: formData },
                {
                    onSuccess: () => {
                        setOpen(false);
                        setEditUser(null);
                        setFormData({ name: '', email: '', password: '', role: '' });
                    },
                },
            );
        } else {
            createUser(formData, {
                onSuccess: () => {
                    setOpen(false);
                    setFormData({ name: '', email: '', password: '', role: '' });
                },
            });
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role: user.roles[0]?.name || '' });
        setOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    const handleAssignRole = (id, role) => {
        assignRole({ id, role });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="space-x-2 bg-white">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Create User</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle>{editUser ? 'Edit User' : 'Create User'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {canManageRoles && (
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                <Button type="submit">{editUser ? 'Update' : 'Create'}</Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.roles[0]?.name || 'No Role'}</TableCell>
                                <TableCell className="space-x-2">
                                    <Button variant="outline" onClick={() => handleEdit(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                    {canManageRoles && (
                                        <Select
                                            onValueChange={(value) => handleAssignRole(user.id, value)}
                                            defaultValue={user.roles[0]?.name}
                                        >
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Assign Role" />
                                            </SelectTrigger>
                                            <SelectContent className="!bg-white">
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}