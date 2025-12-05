import { useMutation } from "@tanstack/react-query";


const API_BASE_URL = "https://6931239a11a8738467cd64e6.mockapi.io/api/v1/users/users"
const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export const useDeleteUser = () => {
    return useMutation<void, Error, string>({
        mutationFn: deleteUser,
    })
}