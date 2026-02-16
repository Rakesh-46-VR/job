import React from 'react';
import { Badge } from '@/components/ui/Badge';

export function TopBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-primary rounded-sm" />
                    <span className="font-serif font-bold text-lg tracking-tight">KodNest Premium</span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    Step 1 / 5
                    <div className="h-4 w-px bg-border" />
                    <span className="text-foreground">Project Setup</span>
                </div>

                <div>
                    <Badge variant="warning">In Progress</Badge>
                </div>
            </div>
        </header>
    );
}
