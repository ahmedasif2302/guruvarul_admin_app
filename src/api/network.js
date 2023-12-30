import { limit } from "firebase/firestore";
import { BASE_URL } from "./api"

export const categoriesNetwork = {
    add: (data) => BASE_URL.post("/categories", data),
    update: (data) => BASE_URL.put("/categories", data),
    page: (page, limit) => BASE_URL.get(`/categories?page=${page}&limit=${limit}`),
    delete: (id) => BASE_URL.delete("/categories/" + id),
    activeCategories: () => BASE_URL.get(`/categories/active`)
};

export const agreementsNetwork = {
    add: (data) => BASE_URL.post("/agreements", data),
    update: (data) => BASE_URL.put("/agreements", data),
    page: (page, limit) => BASE_URL.get(`/agreements?page=${page}&limit=${limit}`),
    delete: (id) => BASE_URL.delete("/agreements/" + id),
    activeAgreements: () => BASE_URL.get(`/agreements/active`)
};

export const propertiesNetwork = {
    add: (data) => BASE_URL.post("/properties", data),
    update: (data) => BASE_URL.put("/properties", data),
    page: (page, limit) => BASE_URL.get(`/properties?page=${page}&limit=${limit}`),
    delete: (id) => BASE_URL.delete("/properties/" + id),
    activeProperties: () => BASE_URL.get(`/properties/active`)
};

export const profilesNetwork = {
    profiles: (data) => BASE_URL.post('/profiles', data)
}

export const taskNetwork = {
    add: (data) => BASE_URL.post("/tasks", data),
    update: (data) => BASE_URL.put("/tasks", data),
    page: (page, limit, data) => BASE_URL.post(`/tasks/list?page=${page}&limit=${limit}`, data),
    delete: (id) => BASE_URL.delete("/tasks/" + id),
    export: (data) => BASE_URL.post("/tasks/export", data),
    download: (page, limit) => BASE_URL.get(`/tasks/downloads?page=${page}&limit=${limit}`),
    deleteExport: (id) => BASE_URL.delete(`/tasks/export/${id}`)
}