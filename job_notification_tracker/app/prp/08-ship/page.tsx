"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import {
    Lock,
    MapPin,
    AlertTriangle,
    CheckCircle2,
    Rocket
} from "lucide-react";

export default function ShipPage() {
    const [isReady, setIsReady] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // Verify checklist completion
        const saved = localStorage.getItem("prp_test_checklist_status");
        if (saved) {
            try {
                const checkedItems = JSON.parse(saved);
                if (checkedItems.length === 10) {
                    setIsReady(true);
                } else {
                    setIsRedirecting(true);
                }
            } catch {
                setIsRedirecting(true);
            }
        } else {
            setIsRedirecting(true);
        }
    }, []);

    if (isRedirecting) {
        return (
            <AppLayout>
                <div className="min-h-[60vh] flex items-center justify-center p-8">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-primary/20 p-8 text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold font-serif text-foreground">Wait! Keep Testing.</h1>
                        <p className="text-muted-foreground mb-4">
                            You must complete all 10 tests before you can access the Ship page. Your work isn't fully verified yet.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-700 text-sm font-medium flex items-center justify-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Checklist Incomplete
                        </div>
                        <Link href="/prp/07-test" className="block w-full">
                            <button className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow hover:brightness-110 transition">
                                Go Back to Checklist
                            </button>
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!isReady) return <div className="p-10 text-center">Verifying status...</div>;

    return (
        <AppLayout>
            <div className="min-h-[70vh] flex items-center justify-center p-8">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-secondary p-10 text-center space-y-8 animate-in zoom-in-95 duration-500">

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-30">
                            <div className="h-32 w-32 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="relative h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto ring-4 ring-green-50">
                            <Rocket className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-4xl font-extrabold font-serif text-foreground tracking-tight">Ready for Takeoff! 🚀</h1>
                        <p className="text-xl text-muted-foreground mt-4 max-w-lg mx-auto">
                            The Placement Readiness Platform passed all tests and is fully validated.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto bg-green-50/50 p-6 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Validations Passed</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">UI/UX Polished</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Logic Verified</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Edge Cases Handled</span>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/placement">
                            <button className="px-8 py-3 bg-foreground text-background font-bold rounded-lg shadow-lg hover:opacity-90 transition flex items-center gap-2 justify-center w-full sm:w-auto">
                                <MapPin className="w-4 h-4" /> Go to Dashboard (Live)
                            </button>
                        </Link>
                        <Link href="/prp/07-test">
                            <button className="px-8 py-3 bg-white border border-border text-muted-foreground font-bold rounded-lg hover:bg-secondary/20 transition flex items-center gap-2 justify-center w-full sm:w-auto">
                                View Checklist Report
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
