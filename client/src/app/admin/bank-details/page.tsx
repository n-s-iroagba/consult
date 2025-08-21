"use client"

import { useState } from "react"
import { useGet } from "@/hooks/useFetch"
import BankCard from "@/components/BankCard"
import BankForm from "@/components/BankForm"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import { Bank } from "@/types/types"
import AdminOffcanvas from "@/components/AdminOffCanvas"
import { Spinner } from "@/components/Spinner"
import { PlusIcon } from "@heroicons/react/24/outline"
import ErrorComponent from "@/components/ErrorComponent"

export default function BanksPage() {
  const { data: bank, loading, error } = useGet<Bank>("/bank")
  const [bankToDelete, setBankToDelete] = useState<Bank | null>(null)
  const [bankToUpdate, setBankToUpdate] = useState<Bank | null>(null)
  const [createBank, setCreateBank] = useState(false)

  if (loading) {
    return (
      <AdminOffcanvas>
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-10 h-10 text-blue-600" />
        </div>
      </AdminOffcanvas>
    )
  }

  if (error) {
    return (
      <AdminOffcanvas>
        <ErrorComponent message={error || "Failed to load banks"} />
      </AdminOffcanvas>
    )
  }

  return (
    <AdminOffcanvas>
      <div className="bg-blue-50 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 p-6 mb-6 relative">
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-blue-800 opacity-20" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-blue-800 opacity-20" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-900">Banks</h1>
             {!bank && <button
                onClick={() => setCreateBank(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Bank</span>
              </button>
}
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-6 mb-8">
            {createBank && (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 overflow-hidden">
                <BankForm onClose={() => setCreateBank(false)} />
              </div>
            )}

            {bankToUpdate && (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 overflow-hidden">
                <BankForm existingBank={bankToUpdate} onClose={() => setBankToUpdate(null)} />
              </div>
            )}
          </div>



              {bank ? (
                <div
                  className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 hover:border-blue-200 transition-colors"
                >
                  <BankCard
                    bank={bank}
                    onEdit={() => setBankToUpdate(bank)}
                    onDelete={() => setBankToDelete(bank)}
                  />
                </div>
           
          
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusIcon className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">No Banks</h3>
                <p className="text-blue-600 mb-4">Add your first bank to receive payments</p>
                <button
                  onClick={() => setCreateBank(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Bank
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {bankToDelete && (
            <DeleteConfirmationModal
              onClose={() => setBankToDelete(null)}
              id={bankToDelete.accountNumber}
              message={`${bankToDelete.bankName} bank`}
              type="bank"
            />
          )}
        </div>
      </div>
    </AdminOffcanvas>
  )
}
