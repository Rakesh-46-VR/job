import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export function Card({ className = '', noPadding = false, children, ...props }: CardProps) {
    return (
        <div
            className={`rounded-lg border border-border bg-card text-card-foreground ${noPadding ? '' : 'p-6'} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
