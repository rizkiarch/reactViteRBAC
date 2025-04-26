import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function ArticlePage() {
    const { getArticlessNotAuth, isLoading, createArticle } = useArticles();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createArticle(formData, {
            onSuccess: () => {
                setFormData({
                    title: "",
                    content: "",
                });
                setOpen(false);
            }
        });
    }



    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Articles</h1>
                        {localStorage.getItem('token') && (
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button>Create Article</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New Article</DialogTitle>
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
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {getArticlessNotAuth.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}