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
          title="Career Command Center"
          description="Manage your job applications, optimize your resume with AI, and track your placement readiness in one focused workspace."
        />

        {/* Main Grid: Primary Workspace + Secondary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Primary Workspace (70% -> col-span-8) */}
          <section className="lg:col-span-8 space-y-6">

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Applications</span>
                <span className="text-3xl font-serif font-bold">12</span>
              </Card>
              <Card className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interviews Scheduled</span>
                <span className="text-3xl font-serif font-bold">3</span>
              </Card>
              <Card className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Readiness Score</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-primary">85</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </Card>
            </div>

            {/* Main Action Area */}
            <Card className="min-h-[300px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background">
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50">
                  <span className="text-xl">�</span>
                </div>
                <h3 className="text-lg font-medium">AI Resume Analyzer</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Upload your current resume to get actionable feedback and match score against your target roles.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button variant="primary">Upload Resume</Button>
                  <Button variant="secondary">View History</Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Recent Notifications</h4>
                  <Badge variant="warning">2 New</Badge>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm border-b border-border/50 pb-2">
                    <span className="font-semibold block">Frontend Dev @ TechCorp</span>
                    <span className="text-muted-foreground text-xs">Application Viewed • 2h ago</span>
                  </li>
                  <li className="text-sm border-b border-border/50 pb-2">
                    <span className="font-semibold block">Full Stack @ StartupInc</span>
                    <span className="text-muted-foreground text-xs">Interview Invitation • 5h ago</span>
                  </li>
                </ul>
              </Card>
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Readiness Checklist</h4>
                  <span className="text-xs text-muted-foreground font-mono">4/6</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 bg-success/20 rounded-full flex items-center justify-center text-[10px] text-success">✓</div>
                    <span>DS & Algo Basics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 bg-success/20 rounded-full flex items-center justify-center text-[10px] text-success">✓</div>
                    <span>System Design</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 border border-border rounded-full"></div>
                    <span className="text-muted-foreground">Mock Interview</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Secondary Panel (30% -> col-span-4) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            <Card className="bg-secondary/10 border-transparent">
              <h3 className="font-serif text-lg font-bold mb-3">Next Best Action</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Your profile visibility is low. Optimizing your LinkedIn headline could improve recruiter reach by 40%.
              </p>

              <div className="flex flex-col gap-3">
                <Button variant="primary" className="w-full justify-start text-left normal-case">
                  Optimize Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left normal-case text-muted-foreground hover:text-foreground">
                  Dismiss
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">System Status</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="text-xs text-muted-foreground">
                Last synced: Just now
              </div>
            </div>
          </aside>

        </div>
      </div>
    </AppLayout>
  );
}
