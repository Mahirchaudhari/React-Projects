import { apiClient } from "./APIClient";

export const retrieveAllTodosForUser = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoForUser = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const updateTodoForUser = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo);

export const retrieveTodoForUser = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);

export const createTodoForUser = (username, todo) => apiClient.post(`/users/${username}/todos`, todo);