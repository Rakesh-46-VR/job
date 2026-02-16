import React from 'react';

interface ContextHeaderProps {
    title: string;
    description: string;
}

export function ContextHeader({ title, description }: ContextHeaderProps) {
    return (
        <div className="flex flex-col gap-2 pb-8 pt-6">
            <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight">
                {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-[720px] leading-relaxed">
                {description}
            </p>
        </div>
    );
}
