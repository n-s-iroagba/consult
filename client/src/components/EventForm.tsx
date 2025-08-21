"use client"

import type React from "react"
import { useState } from "react"
import {  TagIcon } from "@heroicons/react/24/outline"
import type { Event } from "@/types/types"
import { baseURL } from "@/lib/api"
import { toast } from "react-hot-toast/headless"

interface EventFormProps {
 
  existingEvent?: Event
  onClose: () => void
}

export default function EventForm({ existingEvent, onClose }: EventFormProps) {
  const [eventData, setEventData] = useState<Event>(
    existingEvent || {
      id: 0,
      title: "",
      date: "",
      time: "",
      location: "",
      price: 0,
      category: "",
      attendees: "",
      description: "",
    }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  

    setIsSubmitting(true)

    const url = existingEvent ? `/event/${existingEvent.id}` : '/event'

    const method = existingEvent ? "PUT" : "POST"

    try {
      const response = await fetch(`${baseURL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit form")
      }

      toast.success(existingEvent ? "Event updated successfully!" : "Event created successfully!")

      if (!existingEvent) {
        setEventData({ id: 0, title: "", date: "", time: "", location: "", price: 0, category: "", attendees: "", description: ""   })
      }
      onClose()
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {

      setIsSubmitting(false)
      window.location.reload()
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-50 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <TagIcon className="w-6 h-6 text-slate-700" />
        {existingEvent ? "Edit Event" : "Create New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
          />
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
          />
        </div>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <input
          type="number"
          name="price"
          value={eventData.price}
          onChange={handleChange}
          placeholder="Price in USD"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <input
          type="text"
          name="category"
          value={eventData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <input
          type="text"
          name="attendees"
          value={eventData.attendees}
          onChange={handleChange}
          placeholder="Attendees"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded-xl border-2 border-slate-100 focus:border-slate-500 text-black"
        />
        <button className="px-8 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 w-full">
          {isSubmitting ? (
              <>
                <span className="animate-spin">🌀</span>
                Processing...
              </>
            ) : existingEvent ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  )
}
