import axios from "axios";

export interface CreateTask {
    title: string;
    
}
const prefix = "task"
const version = "1"
export const taskApi = {
    addTask: async (data: CreateTask) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`,data)
    }
}