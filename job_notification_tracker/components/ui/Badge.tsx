import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'outline';
}

export function Badge({
    className = '',
    variant = 'default',
    children,
    ...props
}: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
        default: "border-transparent bg-primary text-white hover:bg-primary/80",
        success: "border-transparent bg-success/15 text-success hover:bg-success/25",
        warning: "border-transparent bg-warning/15 text-warning hover:bg-warning/25",
        outline: "text-foreground",
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
}
