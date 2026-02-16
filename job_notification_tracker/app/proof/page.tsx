"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";

export default function Proof() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Proof of Work"
                    description="Validate your progress and ensure all system components are functioning correctly."
                />
                <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                    <p className="text-xl font-serif text-muted-foreground italic">
                        This section will be built in the next step.
                    </p>
                </Card>
            </div>
        </AppLayout>
    );
}
