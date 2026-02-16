"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Activity Dashboard"
                    description="Your central command for job tracking and updates."
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-8 space-y-6">
                        <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                            <div className="text-center space-y-4 max-w-sm mx-auto">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30 text-2xl">
                                    📭
                                </div>
                                <h3 className="text-lg font-medium font-serif">No jobs yet</h3>
                                <p className="text-muted-foreground text-sm">
                                    In the next step, you will load a realistic dataset to populate your dashboard.
                                </p>
                            </div>
                        </Card>
                    </section>

                    <aside className="lg:col-span-4 space-y-6">
                        <Card className="bg-secondary/10 border-transparent">
                            <h3 className="font-serif text-lg font-bold mb-3">System Status</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tracker</span>
                                    <span className="text-foreground font-medium">Ready</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Sync</span>
                                    <span className="text-foreground font-medium">--</span>
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
