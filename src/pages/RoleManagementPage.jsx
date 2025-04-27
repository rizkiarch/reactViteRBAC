import { useState } from 'react';
import { useRoles } from '../hooks/useRoles';
import { usePermissions } from '../hooks/usePermissions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function RoleManagementPage() {
    const { roles, isLoading: rolesLoading, createRole, assignPermission } = useRoles();
    const { permissions, isLoading: permissionsLoading } = usePermissions();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '' });
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');

    const handleCreateRole = (e) => {
        e.preventDefault();
        createRole(formData, {
            onSuccess: () => {
                setOpen(false);
                setFormData({ name: '' });
            },
        });
    };

    const handleAssignPermission = (e) => {
        e.preventDefault();
        assignPermission(
            { roleName: selectedRole, permission: selectedPermission },
            {
                onSuccess: () => {
                    setAssignOpen(false);
                    setSelectedRole('');
                    setSelectedPermission('');
                },
            },
        );
    };

    return (
        <div className="min-w-[1024px]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Role Management</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Role</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Create Role</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateRole} className="space-y-6">
                            <Input
                                placeholder="Role Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Button type="submit">Create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {rolesLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Role Name</TableHead>
                            <TableHead className="w-1/3">Permissions</TableHead>
                            <TableHead className="w-1/3">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                                    {role.permissions?.map((p) => p.name).join(', ') || 'No Permissions'}
                                </TableCell>
                                <TableCell>
                                    <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={() => setSelectedRole(role.name)}
                                            >
                                                Assign Permission
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Assign Permission to {role.name}</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleAssignPermission} className="space-y-6">
                                                <Select
                                                    value={selectedPermission}
                                                    onValueChange={setSelectedPermission}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Permission" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {permissions.map((perm) => (
                                                            <SelectItem key={perm.id || perm.name} value={perm.name}>
                                                                {perm.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button type="submit">Assign</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}