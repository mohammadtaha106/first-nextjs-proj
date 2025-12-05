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
        // Keeping error handling simple as per original, but styled
        // return <div>Error: {error?.message}</div>; 
        // Better to show inside modal
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
         onClick={onClose} >
            <div className="relative w-full max-w-md gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
                    <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">Edit User</h2>
                    <p className="text-sm text-muted-foreground">Make changes to the user profile here.</p>
                </div>
                
                <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-muted-foreground hover:bg-accent hover:text-accent-foreground p-1">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                            placeholder="John Doe"
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                            placeholder="john@example.com"
                            disabled={isPending}

                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                            disabled={isPending}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {isError && (
                        <p className="text-sm text-destructive font-medium">Error: Failed to update user. {error?.message}</p>
                    )}
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                            disabled={isPending}
                        >
                            {isPending ? 'Updating...' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
    );

}