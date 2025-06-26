import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.12:8000", // Replace with your backend IP if needed
  timeout: 5000,
});

export const fetchAtendimentos = (user_id: string) =>
  API.get(`/atendimentos/${user_id}`);

export const createAtendimento = (payload: {
  user_id: string;
  station_id: number;
  observacoes?: string;
  blue: number;
  red: number;
}) => API.post("/atendimentos", payload);

export const deleteAtendimento = (id: string) =>
  API.delete(`/atendimentos/${id}`);
