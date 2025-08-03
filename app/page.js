"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-blue-400 text-white min-h-[82vh] flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Discover Events Based on Your Membership Tier
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Join Tierly today and unlock exclusive events tailored to your level —
            from Free to Platinum.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition">
                  Sign In to Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/events"
                className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Go to Events
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
