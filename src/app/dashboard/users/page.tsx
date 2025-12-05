// app/dashboard/users/page.tsx (Updated)

'use client';
import React, { useState } from 'react'; // <-- useState import kiya
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


  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return (
    <div className="p-6 text-center text-xl font-bold text-gray-500">
      Loading Users... 🔄
    </div>
  );
  
  
  const usersList = users || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>

      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-600">Total Users: {usersList.length}</p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          onClick={() => setIsModalOpen(true)} 
        >
          Add User
        </button>
      </div>

      
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
       <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Name
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Email
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Role
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Actions
      </th>
    </tr>
  </thead>

  <tbody className="bg-white divide-y divide-gray-200">
    {usersList.map((user: any) => (
      <tr key={user.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
          >
            {user.role}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
         <button
  className="text-indigo-600 hover:text-indigo-900 mr-4"
  onClick={() => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }}
>
  Edit
</button>

          <button className="text-red-600 hover:text-red-900" onClick={() => {
    setSelectedUserId(user.id.toString());
    setIsDeleteModalOpen(true);
  }}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

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