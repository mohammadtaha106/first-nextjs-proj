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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in" onClick={onClose}>
            <div className="relative w-full max-w-sm gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
                    <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">Confirm Deletion</h3>
                    <p className="text-sm text-muted-foreground">Are you sure you want to delete this user? This action cannot be undone.</p>
                </div>

                {isError && (
                    <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm font-medium">
                        {error?.message || "An error occurred while deleting the user."}
                    </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-2">
                    <button 
                        onClick={onClose}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2"
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}