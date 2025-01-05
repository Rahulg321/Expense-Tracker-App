import { api } from "@/lib/api"

export const getTotalExpenses = async () => {
    const res = await api.expenses["total-expenses"].$get()

    if(!res.ok){
        throw new Error("Server side error occured")
    }

    const data = await res.json()
    return data
}
