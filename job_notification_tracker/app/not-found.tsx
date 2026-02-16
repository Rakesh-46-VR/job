"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Page Not Found"
                    description="The section you are looking for does not exist or has been moved."
                />
                <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                    <div className="text-center space-y-6 max-w-md mx-auto">
                        <span className="text-4xl">🤔</span>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We couldn't find the page you requested. This might be a broken link or a page that is still under construction.
                        </p>
                        <div className="flex gap-4 justify-center pt-2">
                            <Link href="/">
                                <Button variant="primary">Return Home</Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="secondary">Go to Dashboard</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
