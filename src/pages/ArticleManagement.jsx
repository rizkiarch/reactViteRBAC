import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function ArticleManagement() {
    const { articles, isLoading, createArticle, updateArticle, deleteArticle } = useArticles();
    const [open, setOpen] = useState(false);
    const [editArticle, setEditArticle] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editArticle) {
            updateArticle(
                { id: editArticle.id, data: formData },
                {
                    onSuccess: () => {
                        setOpen(false);
                        setEditArticle(null);
                        setFormData({ title: '', content: '' });
                    },
                },
            );
        } else {
            createArticle(formData, {
                onSuccess: () => {
                    setOpen(false);
                    setFormData({ title: '', content: '' });
                },
            });
        }
    };

    const handleEdit = (article) => {
        setEditArticle(article);
        setFormData({ title: article.title, content: article.content });
        setOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            deleteArticle(id);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Article Management</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Create Article</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editArticle ? 'Edit Article' : 'Create Article'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <Textarea
                                    placeholder="Content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                                <Button type="submit">{editArticle ? 'Update' : 'Create'}</Button>
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
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.user?.name}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="outline" onClick={() => handleEdit(article)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" onClick={() => handleDelete(article.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    )
}