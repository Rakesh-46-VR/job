import React from 'react';
import { TopBar } from './TopBar';
import { ProofFooter } from './ProofFooter';

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopBar />
            <main className="flex-1 container mx-auto px-6 pb-10 md:pb-24">
                {children}
            </main>
            <ProofFooter />
        </div>
    );
}
