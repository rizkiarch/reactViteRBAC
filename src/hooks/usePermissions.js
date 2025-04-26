import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPermission, getPermissions } from '../services/api';

export const usePermissions = () => {
    const queryClient = useQueryClient();

    const { data: permissions, isLoading, error } = useQuery({
        queryKey: ['permissions'],
        queryFn: getPermissions,
    });

    const createMutation = useMutation({
        mutationFn: createPermission,
        onSuccess: () => queryClient.invalidateQueries(['permissions']),
    });

    return {
        permissions: permissions || [],
        isLoading,
        error,
        createPermission: createMutation.mutate,
    };
};