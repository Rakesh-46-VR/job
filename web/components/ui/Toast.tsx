"use client";

import { useEffect } from "react";

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const bgColors = {
        success: 'bg-emerald-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[9999] px-6 py-3 rounded-lg shadow-xl text-white font-medium text-sm animate-in slide-in-from-bottom-5 fade-in duration-300 ${bgColors[type]}`}>
            {message}
        </div>
    );
}
