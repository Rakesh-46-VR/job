"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Digest() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Daily Digest"
                    description="Your personalized summary of relevant job updates and insights."
                />
                <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                    <div className="text-center space-y-4 max-w-sm mx-auto">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30 text-2xl">
                            ☕
                        </div>
                        <h3 className="text-lg font-medium font-serif">Today's digest is preparing</h3>
                        <p className="text-muted-foreground text-sm">
                            We compile new opportunities every morning at 9AM based on your preferences.
                        </p>
                        <div className="pt-2">
                            <Button variant="secondary" size="sm" disabled>View Previous Digests</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
