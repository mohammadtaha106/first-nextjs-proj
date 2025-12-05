// components/AddUserModal.tsx
'use client';

import React, { useState } from 'react';
import { useCreateUser } from '../../hooks/useCreateUser';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const { mutate, isPending, isError, error } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Name and Email are required.');
      return;
    }

    const newUser = { name, email };

    mutate(newUser, {
      onSuccess: () => {
        setName('');
        setEmail('');
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="relative w-full max-w-md gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
          <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">Add New User</h2>
          <p className="text-sm text-muted-foreground">Enter the details to create a new user.</p>
        </div>
        
        <button 
            onClick={onClose} 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-muted-foreground hover:bg-accent hover:text-accent-foreground p-1"
        >
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

          {isError && (
            <p className="text-sm text-destructive font-medium">Error: {error?.message}</p>
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
                {isPending ? 'Creating...' : 'Create User'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;