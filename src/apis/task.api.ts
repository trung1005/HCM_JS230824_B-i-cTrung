
const prefix = "task"
const version = "1"



import axios from "axios"

export default {
    getAll: async () => {
        return await axios.get(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`)
    },
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}`, data)
    },
    delete: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_HOST}/api/v${version}/${prefix}/${id}`)
    }
}