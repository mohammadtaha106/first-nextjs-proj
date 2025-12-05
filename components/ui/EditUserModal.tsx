'use client'

import { useEffect, useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}


export default function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {

 console.log(user);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");

useEffect(() => {
  if (user) {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }
}, [user, isOpen]);
const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useUpdateUser();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !role) {
            alert('Name, Email, and Role are required.');
            return;
        }
        mutate({ id: user.id, name, email, role });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        onClose();

    };
    if (!isOpen) return null;
  
    if (isError) {
        return <div>Error: {error?.message}</div>;
    }
    
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
         onClick={onClose} >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="John Doe"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="john@example.com"
                            disabled={isPending}

                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isPending}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {isError && (
                        <p className="text-sm text-red-500">Error: Failed to update user. {error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        disabled={isPending}
                    >
                        {isPending ? 'Updating...' : 'Update User'}

                    </button>
                </form>
            </div>
        </div>
    
    );

}