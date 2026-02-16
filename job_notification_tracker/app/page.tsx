"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <AppLayout>
      <div className="py-6 space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

        {/* Context Header */}
        <ContextHeader
          title="Stop Missing The Right Jobs."
          description="Precision-matched job discovery delivered daily at 9AM."
        />

        <div className="grid grid-cols-1 gap-8 items-start">
          <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30 mb-2">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-medium font-serif">Setup Your Preferences</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Configure your job search criteria once, and let our system do the heavy lifting. Get notified only when it matters.
              </p>
              <div className="pt-4">
                <Link href="/settings">
                  <Button variant="primary" size="lg">Start Tracking</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
