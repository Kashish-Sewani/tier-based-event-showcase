"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { tierOrder } from "@/utils/tierOrder";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { tierColors } from "@/utils/tierColors";

export default function EventsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    if (!user) return;

    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error);
      return;
    }

    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <SignedOut>
          <p className="text-center">
            Please{" "} <Link href="/sign-in" className="text-blue-600 underline">
              sign in
            </Link>{" "}
            to view events.
          </p>
        </SignedOut>
      </div>
    );
  }

  const userTier = user?.publicMetadata?.tier;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-6">Your Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events available for your tier.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => {
              const canAccess =
                tierOrder[userTier] >= tierOrder[event.tier];

              return (
                <div
                  key={event.id}
                  className="relative bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${tierColors[event.tier] || "bg-gray-100 text-gray-700"}`}
                    >
                      {event.tier}
                    </span>

                  </div>

                  {!canAccess && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white px-4 text-center">
                      <p className="font-semibold">
                        Upgrade to{" "}
                        {event.tier.charAt(0).toUpperCase() +
                          event.tier.slice(1)}{" "}
                        to access this event
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
