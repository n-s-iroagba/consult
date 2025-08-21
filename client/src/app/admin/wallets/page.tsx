'use client'
import { useState } from 'react';
import { useGet} from '@/hooks/useFetch';
import { CryptoWalletCard } from '@/components/CryptoWalletCard';
import CryptoWalletForm from '@/components/CryptoWalletForm';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { CryptoWallet } from '@/types/types';
import AdminOffcanvas from '@/components/AdminOffCanvas';
import { Spinner } from '@/components/Spinner';
import { PlusIcon } from '@heroicons/react/24/outline';
import ErrorComponent from '@/components/ErrorComponent';


export default function CryptoWalletsPage() {
  const { data: wallets, loading, error } = useGet<CryptoWallet[]>('/crypto');
  const [walletToDelete, setWalletToDelete] = useState<CryptoWallet | null>(null);
  const [walletToUpdate, setWalletToUpdate] = useState<CryptoWallet | null>(null);
  const [createWallet, setCreateWallet] = useState(false);

  if (loading) {
    return (
      
        <AdminOffcanvas>
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-10 h-10 text-slate-600" />
          </div>
        </AdminOffcanvas>
      
    );
  }

  if (error) {
    return (
      
        <AdminOffcanvas>
          <ErrorComponent message={error || "Failed to load wallets"} />
        </AdminOffcanvas>
      
    );
  }

  return (
    
      <AdminOffcanvas>
        <div className="bg-slate-50 min-h-screen p-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 p-6 mb-6 relative">
              {/* Decorative Corner Borders */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-800 opacity-20" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-800 opacity-20" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Payment Wallets</h1>
                <button
                  onClick={() => setCreateWallet(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Add Wallet</span>
                </button>
              </div>
            </div>

            {/* Forms */}
            <div className="space-y-6 mb-8">
              {createWallet && (
                <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 overflow-hidden">
                  <CryptoWalletForm onClose={() => setCreateWallet(false)} />
                </div>
              )}

              {walletToUpdate && (
                <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 overflow-hidden">
                  <CryptoWalletForm 
                    existingWallet={walletToUpdate}
                    onClose={() => setWalletToUpdate(null)}
                  />
                </div>
              )}
            </div>

            {/* Wallet List */}
            {wallets && wallets.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {wallets.map((wallet) => (
                  <div 
                    key={wallet.id}
                    className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <CryptoWalletCard
                      wallet={wallet}
                      onEdit={() => setWalletToUpdate(wallet)}
                      onDelete={() => setWalletToDelete(wallet)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlusIcon className="w-8 h-8 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Payment Wallets</h3>
                  <p className="text-slate-600 mb-4">
                    Add your first wallet to start accepting payments
                  </p>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {walletToDelete && (
              <DeleteConfirmationModal
                onClose={() => setWalletToDelete(null)}
                id={walletToDelete.id}
                message={`${walletToDelete.name} wallet`}
                type="wallet"
              />
            )}
          </div>
        </div>
      </AdminOffcanvas>
    
  );
}