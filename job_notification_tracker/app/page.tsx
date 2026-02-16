"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  return (
    <AppLayout>
      <div className="py-6 space-y-8 animate-in fade-in duration-500">

        {/* Context Header */}
        <ContextHeader
          title="Project Initialization"
          description="Configure the foundational settings for your new project. Ensure all environment variables and core dependencies are correctly established before proceeding."
        />

        {/* Main Grid: Primary Workspace + Secondary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Primary Workspace (70% -> col-span-8) */}
          <section className="lg:col-span-8 space-y-6">
            <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background">
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50">
                  <span className="text-xl">🛠️</span>
                </div>
                <h3 className="text-lg font-medium">Workspace Area</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  This is where the main product interaction happens.
                  Clean cards, predictable components, no crowding.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <h4 className="font-medium mb-2">Component A</h4>
                <p className="text-sm text-muted-foreground">Standard card with subtle border and balanced padding.</p>
              </Card>
              <Card>
                <h4 className="font-medium mb-2">Component B</h4>
                <p className="text-sm text-muted-foreground">Everything feels like one mind designed it. No visual drift.</p>
              </Card>
            </div>
          </section>

          {/* Secondary Panel (30% -> col-span-4) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            <Card className="bg-secondary/10 border-transparent">
              <h3 className="font-serif text-lg font-bold mb-3">Step Guidance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Review the configuration settings in the main workspace.
                Once verified, copy the configuration prompt below to generate the next step.
              </p>

              <div className="bg-background border border-border rounded-md p-3 mb-4">
                <code className="text-xs font-mono text-primary block break-words">
                  /generate scaffold --type=react --auth=next-auth
                </code>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-start text-left normal-case">
                  📋 Copy Prompt
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left normal-case text-muted-foreground hover:text-foreground">
                  View Documentation
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="warning">Pending Input</Badge>
              </div>
              <div className="h-px bg-border my-2" />
              <Button className="w-full">Confirm & Proceed</Button>
            </div>
          </aside>

        </div>
      </div>
    </AppLayout>
  );
}
