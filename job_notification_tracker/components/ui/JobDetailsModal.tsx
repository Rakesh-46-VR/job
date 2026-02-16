"use client";

import React, { useEffect } from 'react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface JobDetailsModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    onApply: (url: string) => void;
}

export function JobDetailsModal({ job, isOpen, onClose, onApply }: JobDetailsModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-background w-full max-w-2xl max-h-[85vh] rounded-lg shadow-xl border border-border animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-border bg-background flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">{job.title}</h2>
                        <p className="text-base md:text-lg text-primary font-medium mt-1">{job.company}</p>
                        <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                            <span>{job.location} ({job.mode})</span>
                            <span>•</span>
                            <span>{job.salaryRange}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">&times;</button>
                </div>

                {/* Content - Scrollable Area */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                        <p className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                            {job.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Skills Required</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <Badge key={skill} variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Additional Info</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between border-b border-border/50 py-2">
                                <span className="text-muted-foreground">Source</span>
                                <span className="font-medium">{job.source}</span>
                            </div>
                            <div className="flex justify-between border-b border-border/50 py-2">
                                <span className="text-muted-foreground">Posted</span>
                                <span className="font-medium">{job.postedDaysAgo} days ago</span>
                            </div>
                            <div className="flex justify-between border-b border-border/50 py-2">
                                <span className="text-muted-foreground">Experience</span>
                                <span className="font-medium">{job.experience}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Fixed at bottom of modal */}
                <div className="p-4 border-t border-border bg-background flex justify-end gap-3 shrink-0">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button variant="primary" onClick={() => onApply(job.applyUrl)}>Apply Now ↗</Button>
                </div>
            </div>
        </div>
    );
}
