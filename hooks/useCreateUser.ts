import { useMutation } from "@tanstack/react-query";

interface User {
    id?: string;
    name: string;
    email: string;
    role?: string;
}

const API_BASE_URL = "https://6931239a11a8738467cd64e6.mockapi.io/api/v1/users/users"

const createUser = async (user: User): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const useCreateUser = () => {
    return useMutation<User, Error, User>({
        mutationFn: createUser,
    })
}