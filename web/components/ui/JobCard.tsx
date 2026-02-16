"use client";

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types/job';
import { Card } from '@/components/ui/Card';
import { getMatchScoreColor } from '@/utils/matchScore';

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

interface JobCardProps {
    job: Job;
    matchScore?: number;
    onView: (job: Job) => void;
    onSave: (id: string) => void;
    isSaved?: boolean;
    status?: JobStatus;
    onStatusChange?: (id: string, newStatus: JobStatus) => void;
}

export function JobCard({ job, matchScore, onView, onSave, isSaved = false, status = 'Not Applied', onStatusChange }: JobCardProps) {
    const getSourceColor = (source: Job['source']) => {
        switch (source) {
            case 'LinkedIn': return 'bg-blue-100 text-blue-700';
            case 'Naukri': return 'bg-yellow-100 text-yellow-700';
            case 'Indeed': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (s: JobStatus) => {
        switch (s) {
            case 'Applied': return 'bg-blue-500 text-white border-blue-600';
            case 'Rejected': return 'bg-red-500 text-white border-red-600';
            case 'Selected': return 'bg-green-500 text-white border-green-600';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <Card className={`hover:border-primary/50 transition-colors duration-200 flex flex-col justify-between h-full group relative overflow-hidden ${status === 'Rejected' ? 'opacity-70 grayscale-[0.5] hover:grayscale-0' : ''}`}>
            {/* Top Status Bar */}
            <div className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity ${status === 'Selected' ? 'bg-green-500 opacity-100' : 'bg-primary'}`} />

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-serif font-bold text-lg text-foreground leading-snug line-clamp-2">
                            {job.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">{job.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {matchScore !== undefined && (
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getMatchScoreColor(matchScore)}`}>
                                {matchScore}% Match
                            </div>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getSourceColor(job.source)}`}>
                            {job.source}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-foreground/80">
                    <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                        📍 {job.location} ({job.mode})
                    </span>
                    <span className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                        💼 {job.experience}
                    </span>
                </div>

                {/* Status Tracker UI */}
                <div className="pt-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5 uppercase tracking-wider">Application Status</label>
                    <select
                        value={status}
                        onChange={(e) => onStatusChange?.(job.id, e.target.value as JobStatus)}
                        className={`w-full text-xs font-medium px-2 py-1.5 rounded border outline-none cursor-pointer transition-colors ${getStatusColor(status)}`}
                    >
                        <option value="Not Applied" className="bg-white text-gray-700">⚪ Not Applied</option>
                        <option value="Applied" className="bg-white text-gray-700">🔵 Applied</option>
                        <option value="Rejected" className="bg-white text-gray-700">🔴 Rejected</option>
                        <option value="Selected" className="bg-white text-gray-700">🟢 Selected</option>
                    </select>
                </div>

                <p className="text-xs text-muted-foreground pt-1 border-t border-border/40 mt-2">
                    Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
                </p>
            </div>

            <div className="pt-4 flex gap-2 mt-auto">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(job)}>
                    Details
                </Button>
                <Button
                    variant={isSaved ? "secondary" : "primary"}
                    size="sm"
                    className="flex-1"
                    onClick={() => onSave(job.id)}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </Button>
            </div>
        </Card>
    );
}
