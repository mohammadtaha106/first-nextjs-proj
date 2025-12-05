import { useDeleteUser } from "../../hooks/useDeleteUser";

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export const DeleteUserModal = ({ isOpen, onClose, userId }: DeleteUserModalProps) => {

    const { mutate, isPending, isError, error } = useDeleteUser();
    if(!isOpen) return null;

    const handleDelete = () => {
        mutate(userId, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (    
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                {isError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error?.message || "An error occurred while deleting the user."}
                    </div>
                )}
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}