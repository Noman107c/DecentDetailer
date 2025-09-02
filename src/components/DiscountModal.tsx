"use client";

import React from "react";
import Link from "next/link";


interface DiscountData {
  title: string;
  description: string;
  discountText: string;
  discountCode: string;
  buttonText: string;
}

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DiscountData | null;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-scaleIn shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          {/* Header */}
          <div className="mb-5">
            <div className="bg-sky-600 text-white px-6 py-3 rounded-lg">
              <h3 className="text-2xl font-bold">{data.title}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{data.description}</p>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-4xl font-bold text-sky-400">
                {data.discountText}
              </span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-dashed border-blue-300">
            <p className="text-sm text-gray-600 mb-1">Use promo code:</p>
            <p className="text-xl font-mono font-bold text-sky-400 bg-white py-2 rounded-md">
              {data.discountCode}
            </p>
          </div>

        

          <div className="flex flex-col gap-3">
            <Link href="/booking">
              <button
                onClick={onClose}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {data.buttonText || "Claim Your Discount"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
