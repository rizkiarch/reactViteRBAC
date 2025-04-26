import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createArticle, deleteArticle, getArticles, updateArticle, getArticlesNotAuth } from '../services/api';

export const useArticles = () => {
    const queryClient = useQueryClient();

    const { data: articles, isLoading, error } = useQuery({
        queryKey: ['articles'],
        queryFn: getArticles,
    });

    const { data: getArticlessNotAuth } = useQuery({
        queryKey: ['articlesNotAuth'],
        queryFn: getArticlesNotAuth,
    });

    const createMutation = useMutation({
        mutationFn: createArticle,
        onSuccess: () => queryClient.invalidateQueries(['articles']),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateArticle(id, data),
        onSuccess: () => queryClient.invalidateQueries(['articles']),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => queryClient.invalidateQueries(['articles']),
    });

    return {
        articles: articles || [],
        getArticlessNotAuth: getArticlessNotAuth || [],
        isLoading,
        error,
        createArticle: createMutation.mutate,
        updateArticle: updateMutation.mutate,
        deleteArticle: deleteMutation.mutate,
    };
};