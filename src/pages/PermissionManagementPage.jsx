import { useState } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

export default function PermissionManagementPage() {
    const { permissions, isLoading, createPermission } = usePermissions();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    const handleCreatePermission = (e) => {
        e.preventDefault();
        createPermission(formData, {
            onSuccess: () => {
                setOpen(false);
                setFormData({ name: '' });
            },
        });
    };

    return (
        <div className="min-w-[1024px]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Permission Management</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Permission</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Create Permission</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreatePermission} className="space-y-6">
                            <Input
                                placeholder="Permission Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Button type="submit">Create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Permission Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permissions.map((perm) => (
                            <TableRow key={perm.id || perm.name}>
                                <TableCell>{perm.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}