'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-decent-blue mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-decent-blue hover:bg-decent-lightBlue text-white">
                Go Home
              </Button>
            </Link>
            <br />
            <Link href="/contact">
              <Button variant="outline" className="border-decent-blue text-decent-blue hover:bg-decent-blue hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
   
    </div>
  );
}
