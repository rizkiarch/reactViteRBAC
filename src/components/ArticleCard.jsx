import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { BookmarkPlus, Heart, MessageSquare, Share2 } from "lucide-react";

export default function ArticleCard({ article }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(126);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = () => {
        if (hasLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setHasLiked(!hasLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };
    return (
        <>
            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="font-medium text-lg">{article.user?.name}</h3>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2 rounded-full bg-white hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Share2 size={20} />
                        </button>
                        <button
                            className={`p-2 rounded-full bg-white hover:bg-gray-100 dark:hover:bg-gray-800 ${isBookmarked ? 'text-blue-500' : ''}`}
                            onClick={handleBookmark}
                        >
                            <BookmarkPlus size={20} />
                        </button>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            </header>

            {/* Article Content */}
            <article className="prose dark:prose-invert max-w-none mb-8">
                {article.content}
            </article>

            {/* Article Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 bg-white"
                            onClick={handleLike}
                        >
                            <Heart
                                className={`${hasLiked ? 'fill-red-500 text-red-500' : ''}`}
                                size={24}
                            />
                            <span>{likes}</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <MessageSquare size={24} />
                            <span>42</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <Card className="hover:shadow-lg transition-shadow">
        //     <CardHeader>
        //         <CardTitle>{article.title}</CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         <p className="text-gray-600 line-clamp-3">{article.content}</p>
        //         <p className="text-sm text-gray-500 mt-2">By {article.user?.name}</p>
        //         <Link to={`/article/${article.id}`} className="text-blue-500 hover:underline mt-4 block">
        //             Read More
        //         </Link>
        //     </CardContent>
        // </Card>
    );
}