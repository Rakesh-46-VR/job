"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShipPage() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem("prp_test_checklist_status");
        if (saved) {
            try {
                const checkedItems = JSON.parse(saved);
                // Check if all 10 tests are completed
                if (checkedItems.length >= 10) {
                    setIsVerified(true);
                }
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
        setIsLoading(false);
    }, []);

    if (isLoading) return null;

    if (!isVerified) {
        return (
            <AppLayout>
                <div className="py-24 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500 text-center px-4">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-2xl font-bold text-red-600">Ship Locked</h1>
                    <p className="text-muted-foreground max-w-md">
                        You cannot access the shipping station until all system verification tests have passed.
                    </p>
                    <Link href="/prp/07-test">
                        <Button variant="outline" className="mt-4">
                            ← Return to Verification Checklist
                        </Button>
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="py-12 space-y-8 animate-in fade-in duration-700 max-w-3xl mx-auto text-center">
                <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 text-4xl mb-4">
                    🚢
                </div>

                <ContextHeader
                    title="Ready for Liftoff"
                    description="All systems verified. You are clear to launch."
                />

                <Card className="p-8 bg-gradient-to-br from-white to-green-50/50 border-green-100">
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-green-900">Deployment Manifest</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="p-4 bg-white rounded border border-green-100">
                                <span className="block text-xs uppercase text-green-600 font-bold mb-1">Status</span>
                                <span className="font-mono text-lg">VERIFIED_PASS</span>
                            </div>
                            <div className="p-4 bg-white rounded border border-green-100">
                                <span className="block text-xs uppercase text-green-600 font-bold mb-1">Version</span>
                                <span className="font-mono text-lg">v1.0.0-RC1</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-green-200/50">
                            <p className="text-sm text-green-800 italic">
                                "Great products are built on a foundation of rigorous testing."
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-center gap-4">
                    <Link href="/">
                        <Button variant="outline">Back Home</Button>
                    </Link>
                    <Link href="/prp/proof">
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                            Prepare Release Bundle
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
