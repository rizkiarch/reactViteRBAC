import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor untuk menambahkan token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials) =>
    api.post('/auth/login', credentials).then((res) => res.data.data);

export const register = (data) =>
    api.post('/auth/register', data).then((res) => res.data.data);

export const getArticlesNotAuth = () =>
    api.get('/articles/not-auth').then((res) => res.data.data);

export const getArticles = () =>
    api.get('/articles').then((res) => res.data.data);

export const createArticle = (data) =>
    api.post('/articles', data).then((res) => res.data.data);

export const updateArticle = (id, data) =>
    api.put(`/articles/${id}`, data).then((res) => res.data.data);

export const deleteArticle = (id) =>
    api.delete(`/articles/${id}`).then((res) => res.data);

export const getUsers = () =>
    api.get('/users').then((res) => res.data.data);

export const createUser = (data) =>
    api.post('/users', data).then((res) => res.data.data);

export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data).then((res) => res.data.data);

export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then((res) => res.data);

export const assignRole = (id, role) =>
    api.post(`/users/${id}/assign-role`, { role }).then((res) => res.data.data);

export const getRoles = () =>
    api.get('/roles').then((res) => res.data.data);

export const getPermissions = () =>
    api.get('/roles/permissions').then((res) => res.data.data);

export const createRole = (data) =>
    api.post('/roles', data).then((res) => res.data.data);

export const createPermission = (data) =>
    api.post('/roles/permissions', data).then((res) => res.data.data);

export const assignPermissionToRole = (roleName, permission) =>
    api.post(`/roles/permissions/assign/${roleName}`, { name: permission }).then((res) => res.data.data);

export const updateUserProfile = (id, data) =>
    api.put(`/users/${id}`, data).then((res) => res.data.data);
export default api;