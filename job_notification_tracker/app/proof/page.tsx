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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="min-h-[200px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                        <p className="text-lg font-serif text-muted-foreground italic">
                            Artifact Collection Placeholder
                        </p>
                    </Card>
                    <Card className="min-h-[200px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                        <p className="text-lg font-serif text-muted-foreground italic">
                            Tests & Logs Placeholder
                        </p>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
