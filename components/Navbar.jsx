"use client";
import Link from "next/link";
import { SignedIn, SignedOut, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16 text-white">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Tierly</span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white text-blue-600 px-3 py-1 rounded cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {user && (
              <span className="hidden sm:block">
                Hi, <span className="font-semibold">{user.firstName || user.username}</span>
              </span>
            )}
            <Link href="/events" className="hover:underline">
              Events
            </Link>
            <SignOutButton>
              <button className="bg-white text-blue-600 px-3 py-1 rounded cursor-pointer">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
