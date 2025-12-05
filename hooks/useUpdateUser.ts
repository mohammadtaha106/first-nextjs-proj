import { useMutation } from "@tanstack/react-query";
import { User } from "better-auth";


interface UpdateUser {
        id: string;
        name: string;
        email: string;
        role: string;   
    }


    const API_BASE_URL = "https://6931239a11a8738467cd64e6.mockapi.io/api/v1/users/users"

    const updateUser = async (user: UpdateUser): Promise<User> => {
        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
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

   export const useUpdateUser = () => {
        return useMutation<User, Error, UpdateUser>({
            mutationFn: updateUser,
        })
    }