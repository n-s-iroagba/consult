"use client"

import { useState } from "react"
import { useGet } from "@/hooks/useFetch"
import EventCard from "@/components/EventCard"
import EventForm from "@/components/EventForm"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import { Event } from "@/types/types"
import AdminOffcanvas from "@/components/AdminOffCanvas"
import { Spinner } from "@/components/Spinner"
import { PlusIcon } from "@heroicons/react/24/outline"
import ErrorComponent from "@/components/ErrorComponent"

export default function EventsPage() {
  const { data: events, loading, error } = useGet<Event[]>("/event")
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)
  const [eventToUpdate, setEventToUpdate] = useState<Event | null>(null)
  const [createEvent, setCreateEvent] = useState(false)

  if (loading) {
    return (
      <AdminOffcanvas>
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-10 h-10 text-slate-600" />
        </div>
      </AdminOffcanvas>
    )
  }

  if (error) {
    return (
      <AdminOffcanvas>
        <ErrorComponent message={error || "Failed to load events"} />
      </AdminOffcanvas>
    )
  }

  return (
    <AdminOffcanvas>
      <div className="bg-slate-50 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 p-6 mb-6 relative">
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-800 opacity-20" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-800 opacity-20" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">Events</h1>
              <button
                onClick={() => setCreateEvent(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-6 mb-8">
            {createEvent && (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 overflow-hidden">
                <EventForm onClose={() => setCreateEvent(false)} />
              </div>
            )}

            {eventToUpdate && (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 overflow-hidden">
                <EventForm existingEvent={eventToUpdate} onClose={() => setEventToUpdate(null)} />
              </div>
            )}
          </div>

          {/* Event List */}
          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <EventCard
                    event={event}
                    onEdit={() => setEventToUpdate(event)}
                    onDelete={() => setEventToDelete(event)}
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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Events</h3>
                <p className="text-slate-600 mb-4">Create your first event to get started</p>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {eventToDelete && (
            <DeleteConfirmationModal
              onClose={() => setEventToDelete(null)}
              id={eventToDelete.id}
              message={`${eventToDelete.title} event`}
              type="event"
            />
          )}
        </div>
      </div>
    </AdminOffcanvas>
  )
}
