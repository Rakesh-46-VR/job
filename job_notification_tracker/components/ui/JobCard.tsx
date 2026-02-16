"use client";

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types/job';
import { Card } from '@/components/ui/Card';
import { getMatchScoreColor } from '@/utils/matchScore';

interface JobCardProps {
    job: Job;
    matchScore?: number;
    onView: (job: Job) => void;
    onSave: (id: string) => void;
    isSaved?: boolean;
}

export function JobCard({ job, matchScore, onView, onSave, isSaved = false }: JobCardProps) {
    const getSourceColor = (source: Job['source']) => {
        switch (source) {
            case 'LinkedIn': return 'bg-blue-100 text-blue-700';
            case 'Naukri': return 'bg-yellow-100 text-yellow-700';
            case 'Indeed': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Card className="hover:border-primary/50 transition-colors duration-200 flex flex-col justify-between h-full group relative overflow-hidden">
            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 w-1 bg-primary h-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-serif font-bold text-lg text-foreground leading-snug line-clamp-2">
                            {job.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">{job.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getSourceColor(job.source)}`}>
                            {job.source}
                        </span>
                        {matchScore !== undefined && (
                            <div className={`px-2 py-0.5 rounded textxs font-bold border ${getMatchScoreColor(matchScore)}`}>
                                {matchScore}% Match
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-foreground/80">
                    <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                        📍 {job.location} ({job.mode})
                    </span>
                    <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                        💼 {job.experience}
                    </span>
                    <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                        💰 {job.salaryRange}
                    </span>
                </div>

                <p className="text-xs text-muted-foreground pt-1">
                    Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
                </p>
            </div>

            <div className="pt-6 flex gap-3 mt-auto">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(job)}>
                    View Details
                </Button>
                <Button
                    variant={isSaved ? "secondary" : "primary"}
                    size="sm"
                    className="flex-1"
                    onClick={() => onSave(job.id)}
                >
                    {isSaved ? 'Saved' : 'Save Job'}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="px-3"
                    onClick={() => window.open(job.applyUrl, '_blank')}
                >
                    ↗
                </Button>
            </div>
        </Card>
    );
}
