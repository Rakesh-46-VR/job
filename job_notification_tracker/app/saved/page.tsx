"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Saved() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Saved Jobs"
                    description="A curated list of opportunities you are tracking."
                />
                <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                    <div className="text-center space-y-4 max-w-sm mx-auto">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30 text-2xl">
                            🔖
                        </div>
                        <h3 className="text-lg font-medium font-serif">Your shortlist is empty</h3>
                        <p className="text-muted-foreground text-sm">
                            Jobs you save from your daily digest or search will appear here for easy access.
                        </p>
                        <div className="pt-2">
                            <Link href="/dashboard">
                                <Button variant="secondary" size="sm">Go to Dashboard</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
