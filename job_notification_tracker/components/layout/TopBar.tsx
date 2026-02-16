import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';

export function TopBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6">
                <div className="flex items-center">
                    {/* Logo */}
                    <div className="w-20 h-20 relative flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Vantage Logo"
                            fill
                            className="object-contain" // ensures logo fits within the 32x32 box without distortion
                            priority
                        />
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight text-foreground">Vantage</span>
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
