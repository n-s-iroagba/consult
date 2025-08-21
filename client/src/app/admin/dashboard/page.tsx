"use client"

import AdminOffcanvas from "@/components/AdminOffCanvas"
import { Spinner } from "@/components/Spinner"
import TodoAlert from "@/components/TodoAlert"
import { useAuthContext } from "@/hooks/useAuth"
import { useGet } from "@/hooks/useFetch"
import { Bank, CryptoWallet } from "@/types/types"
import { ReactNode } from "react"


const AdminDashboard = () => {
  const { loading: authLoading, user } = useAuthContext()
 

  const {
    data: wallets,
    loading: walletLoading,
  } = useGet<CryptoWallet[]>('/crypto')
  const { data: events, loading: eventLoading } = useGet<Event[]>('/event')
  const { data: bank, loading: bankLoading } = useGet<Bank>('/bank')



  const todos: ReactNode[] = []

  if (!events?.length) {
    todos.push(
      <TodoAlert
            key="event-alert"
            message="You do not have any events, add events for investors"
            link="/admin/events" heading={""} testId={""}      />,
    )
  }
  if (!wallets?.length) {
    todos.push(
      <TodoAlert
            key="wallet-alert"
            message="You do not have any wallets, add wallets to start managing transactions"
            link="/admin/wallets" heading={"Wallets"} testId={"wallet-alert"} />,
    )
  }


  if (!bank && !bankLoading ) {
    todos.push(
      <TodoAlert
            key="Pending-bank"
            message="You have pending unverified bank transactions, kindly verify them."
            link="/admin/bank-details" heading={"Bank Details"} testId={""}      />,
    )
  }

  const isLoading = authLoading || walletLoading || eventLoading || bankLoading



  

  return (
    
      <AdminOffcanvas>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen px-4">
            <Spinner className="w-8 h-8 text-slate-600" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user.username}! 👋
              </h1>
              <p className="text-slate-700">Here&apos;s what needs your attention</p>
            </div>

            {todos.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {todos}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">All Set! 🎉</h2>
                <p className="text-slate-700">Everything looks good. No immediate actions required.</p>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Total events</h3>
                <p className="text-2xl font-bold text-slate-600">{events?.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Active Wallets</h3>
                <p className="text-2xl font-bold text-green-600">{wallets?.length}</p>
              </div>
           
            </div>
          </div>
        )}
      </AdminOffcanvas>
   
  )
}

export default AdminDashboard