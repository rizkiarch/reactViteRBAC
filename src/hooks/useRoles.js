import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoles, createRole, assignPermissionToRole } from '../services/api';

export const useRoles = () => {
    const queryClient = useQueryClient();

    const { data: roles, isLoading, error } = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
    });

    const createMutation = useMutation({
        mutationFn: createRole,
        onSuccess: () => queryClient.invalidateQueries(['roles']),
    });

    const assignPermissionMutation = useMutation({
        mutationFn: ({ roleName, permission }) => assignPermissionToRole(roleName, permission),
        onSuccess: () => queryClient.invalidateQueries(['roles']),
    });

    return {
        roles: roles || [],
        isLoading,
        error,
        createRole: createMutation.mutate,
        assignPermission: assignPermissionMutation.mutate,
    };
};