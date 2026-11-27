import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getServices = () =>
  api.get("/services/").then((res) => res.data);

export const getRealisations = (params = {}) =>
  api.get("/realisation/", { params }).then((res) => res.data);

export const getRealisation = (slug) =>
  api.get(`/realisation/${slug}/`).then((res) => res.data);

export const getFaq = () =>
  api.get("/faq/").then((res) => res.data);

export const envoyerDevis = (formData) =>
  api.post("/devis/", formData).then((res) => res.data);