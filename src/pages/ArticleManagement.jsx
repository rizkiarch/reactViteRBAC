import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import ReactQuill from "react-quill-new"; // Ganti dengan react-quill-new
import "react-quill-new/dist/quill.snow.css"; // Impor CSS react-quill-new

export default function ArticleManagement() {
    const { articles, isLoading, createArticle, updateArticle, deleteArticle } = useArticles();
    const [open, setOpen] = useState(false);
    const [editArticle, setEditArticle] = useState(null);
    const [formData, setFormData] = useState({ title: "", content: "" });

    // Konfigurasi toolbar Quill
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editArticle) {
            updateArticle(
                { id: editArticle.id, data: formData },
                {
                    onSuccess: () => {
                        setOpen(false);
                        setEditArticle(null);
                        setFormData({ title: "", content: "" });
                    },
                }
            );
        } else {
            createArticle(formData, {
                onSuccess: () => {
                    setOpen(false);
                    setFormData({ title: "", content: "" });
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
        if (window.confirm("Are you sure you want to delete this article?")) {
            deleteArticle(id);
        }
    };

    return (
        <div className="min-w-[1024px]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Article Management</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Article</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>{editArticle ? "Edit Article" : "Create Article"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                modules={quillModules}
                                formats={quillFormats}
                                placeholder="Write your content here..."
                                className="h-64"
                            />
                            <Button type="submit">{editArticle ? "Update" : "Create"}</Button>
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
                            <TableHead className="w-1/3">Title</TableHead>
                            <TableHead className="w-1/3">Author</TableHead>
                            <TableHead className="w-1/3">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.user?.name}</TableCell>
                                <TableCell className="space-x-4">
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
    );
}