import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignRole, createUser, deleteUser, getUsers, updateUser } from '../services/api';

export const useUsers = () => {
    const queryClient = useQueryClient();

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });

    const assignRoleMutation = useMutation({
        mutationFn: ({ id, role }) => assignRole(id, role),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });

    return {
        users: users || [],
        isLoading,
        error,
        createUser: createMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate,
        assignRole: assignRoleMutation.mutate,
    };
};