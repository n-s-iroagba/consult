"use client"

import type { CryptoWallet } from "@/types/types"
import { PencilSquareIcon, TrashIcon, WalletIcon } from "@heroicons/react/24/outline"

interface CryptoWalletCardProps {
  wallet: CryptoWallet
  onEdit: () => void
  onDelete: () => void
}

export function CryptoWalletCard({ wallet, onEdit, onDelete }: CryptoWalletCardProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border-2 border-slate-50 hover:border-slate-100 transition-all relative group">
      {/* Decorative Corner Borders - Reduced size for mobile */}
      <div className="absolute top-1.5 right-1.5 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-slate-800 opacity-20" />
      <div className="absolute bottom-1.5 left-1.5 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-slate-800 opacity-20" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 sm:p-3 bg-slate-100 rounded-lg">
            <WalletIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-slate-900 text-base sm:text-lg">{wallet.name}</h3>
              {/* Status Indicator - Moved inline for mobile */}
              <div className="flex items-center gap-1 sm:hidden">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-600">Active</span>
              </div>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm font-mono break-words mt-1">{wallet.address}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Action Buttons with larger touch targets */}
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={onEdit}
              className="p-2 sm:p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Edit wallet"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
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

      {/* Status Indicator - Desktop view */}
      <div className="absolute top-3 right-3 sm:flex items-center gap-1 hidden">
        <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
        <span className="text-xs text-slate-600">Active</span>
      </div>
    </div>
  )
}

export { CryptoWalletCard as CryptoWallet }