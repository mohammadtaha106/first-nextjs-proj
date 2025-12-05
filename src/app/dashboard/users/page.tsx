'use client';
import React, { useState } from 'react';
import { useGetUsers } from '../../../../hooks/useGetUsers';
import AddUserModal from '../../../../components/ui/AddUserModal';
import EditUserModal from '../../../../components/ui/EditUserModal';
import { DeleteUserModal } from '../../../../components/ui/DeleteUserModal';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser , setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  
  const { data: users, isLoading, error , refetch} = useGetUsers();

  if (error) return <div className="p-6 text-destructive">Error: {error.message}</div>;
  if (isLoading) return (
    <div className="p-6 text-center text-xl font-bold text-muted-foreground">
      Loading Users... 🔄
    </div>
  );
  
  const usersList = users || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">Manage your team members and their account permissions here.</p>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          onClick={() => setIsModalOpen(true)} 
        >
          Add User
        </button>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Role</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {usersList.map((user: any) => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle font-medium">{user.name}</td>
                        <td className="p-4 align-middle">{user.email}</td>
                        <td className="p-4 align-middle">
                            <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs  font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${user.role === 'admin' ? 'border-transparent bg-destructive text-white text-destructive-foreground hover:bg-destructive/80' : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                            >
                                {user.role}
                            </span>
                        </td>
                        <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="inline-flex items-center text-white justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 text-xs" 
                                    onClick={() => {
                                        setSelectedUserId(user.id.toString());
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {setIsEditModalOpen(false)
          refetch();
        }}
        user={selectedUser}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() =>{setIsDeleteModalOpen(false)
          refetch();
        }}
        userId={selectedUserId}
      />
    </div>
  );
};

export default UsersPage;