'use client'
import { useState } from 'react';


import AdminOffCanvas from '@/components/AdminOffCanvas';


import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { Spinner } from '@/components/Spinner';
import ErrorComponent from '@/components/ErrorComponent';
import { useGet } from '@/hooks/useFetch';
import { TrashIcon } from 'lucide-react';

interface Attendant {
  
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    country: string;

  };
interface AttendantProps {
  attendant: Attendant;
  onDelete: () => void;
}

const AttendantCard: React.FC<AttendantProps> = ({ attendant, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {attendant.firstName} {attendant.lastName}
        </h2>
        <span className="text-sm text-gray-500">ID: {attendant.id}</span>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {attendant.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Country:</span> {attendant.country}
        </p>
      </div>
        <div className="flex justify-between items-center">
          {/* Action Buttons with larger touch targets */}
          <div className="flex gap-1 sm:gap-2">
           
            <button
              onClick={onDelete}
              className="p-2 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete wallet"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
    </div>
  );
};


export default function ManagerCrudPage() {
  const { data: managers, loading, error } = useGet<Attendant[]>('/attendant');
  const [managerToDelete, setManagerToDelete] = useState<Attendant | null>(null);




  if (loading) {
    return (
      <AdminOffCanvas>
      <div className="flex justify-center py-12">
        <Spinner className="w-10 h-10 text-blue-600" />
      </div>
      </AdminOffCanvas>
    );
  }

  if (error) {
    return<AdminOffCanvas>
     <ErrorComponent message={error || "Failed to load managers"} />;
     </AdminOffCanvas>
  }



  return (
    <>
    <AdminOffCanvas>
    {managers?.map((attendant) => (
      <AttendantCard key={attendant.id} attendant={attendant} onDelete={() => setManagerToDelete(attendant)} />
    ))}
       {managerToDelete && (
                <DeleteConfirmationModal
                  onClose={() => setManagerToDelete(null)}
                  id={managerToDelete.id}
                  message={`${managerToDelete.firstName} ${managerToDelete.lastName}`}
                  type="attendant"
                />
              )}
    </AdminOffCanvas>
    </>
  );
}




 



