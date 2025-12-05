import { useQuery } from "@tanstack/react-query";
import { Interface } from "readline";   

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

const API_BASE_URL = "https://6931239a11a8738467cd64e6.mockapi.io/api/v1/users/users"

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const useGetUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,

        
    })
}