import axios from "axios";
import { IBudget } from "../models/IBudget";

const URL = 'http://localhost:8000/api/v1/budget/'

export default class BudgetService {


    public static async getAll() {
        return axios.get(URL)
    }

    public static async create(data: IBudget) {
        return axios.post(URL, data)
    }

    public static async update(data: IBudget) {
        return axios.put(`${URL}${data.id}/`, data)
    }

    public static async delete(id: number) {
        return axios.delete(`${URL}${id}/`)
    }

    public static async getHistory(id: number) {
        return axios.get(`${URL}${id}/history/`)
    }
}