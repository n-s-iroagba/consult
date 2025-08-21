"use client"

import type { Event } from "@/types/types"
import { CalendarIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"


interface EventCardProps {
  event: Event
  onEdit:()=>void
  onDelete:()=>void
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 overflow-hidden group">
      <div className="p-6 text-center">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <CalendarIcon className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <div className="text-sm font-semibold text-gray-900">{event.date}</div>
            <div className="text-xs text-gray-500">{event.time}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <MapPinIcon className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <div className="text-sm font-semibold text-gray-900">{event.location}</div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <CurrencyDollarIcon className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <div className="text-sm font-semibold text-gray-900">{event.price}</div>
            <div className="text-xs text-gray-500">Price</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <UsersIcon className="w-5 h-5 mx-auto text-gray-500 mb-1" />
            <div className="text-sm font-semibold text-gray-900">{event.attendees}</div>
            <div className="text-xs text-gray-500">Attendees</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>

             <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={onEdit}
              className="p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span className="hidden md:inline">Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <TrashIcon className="w-5 h-5" />
              <span className="hidden md:inline">Delete</span>
            </button>
          </div>
    
      </div>
    </div>
  )
}
