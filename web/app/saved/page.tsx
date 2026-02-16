"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { JobCard } from "@/components/ui/JobCard";
import { JobDetailsModal } from "@/components/ui/JobDetailsModal";
import { Card } from "@/components/ui/Card";
import { JOBS_DATA } from "@/data/jobs";
import { Job } from "@/types/job";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Toast } from "@/components/ui/Toast";

export default function Saved() {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [jobStatus, setJobStatus] = useState<Record<string, string>>({});
    const [toast, setToast] = useState({ message: "", visible: false });

    // Modal State
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            const ids: string[] = JSON.parse(saved);
            setSavedIds(ids);
            const jobs = JOBS_DATA.filter(job => ids.includes(job.id));
            setSavedJobs(jobs);
        }

        // Load Job Statuses
        const statuses = localStorage.getItem('jobTrackerStatus');
        if (statuses) {
            setJobStatus(JSON.parse(statuses));
        }
    }, []);

    const handleStatusChange = (id: string, newStatus: string) => {
        const updated = { ...jobStatus, [id]: newStatus };
        setJobStatus(updated);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updated));

        // Log history for Digest
        if (newStatus !== 'Not Applied') {
            const historyItem = {
                jobId: id,
                jobTitle: savedJobs.find(j => j.id === id)?.title || 'Job',
                company: savedJobs.find(j => j.id === id)?.company || 'Company',
                status: newStatus,
                date: new Date().toISOString()
            };

            const existingHistory = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
            const newHistory = [historyItem, ...existingHistory].slice(0, 20); // Keep last 20
            localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(newHistory));

            // Show toast notification
            setToast({ message: `Status updated to ${newStatus}`, visible: true });
        }
    };

    const handleSave = (id: string) => {
        // Determine new state (toggle logic, though usually saved page implies unsave)
        let newSavedIds;
        if (savedIds.includes(id)) {
            newSavedIds = savedIds.filter(jobId => jobId !== id);
        } else {
            newSavedIds = [...savedIds, id];
        }

        setSavedIds(newSavedIds);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedIds));

        // Update local list instantly
        setSavedJobs(prev => prev.filter(job => newSavedIds.includes(job.id)));
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500">
                <ContextHeader
                    title="Saved Jobs"
                    description="A curated list of opportunities you are tracking."
                />

                {savedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onView={handleView}
                                onSave={handleSave}
                                isSaved={true}
                                status={(jobStatus[job.id] as any) || 'Not Applied'}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="min-h-[400px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50">
                        <div className="text-center space-y-4 max-w-sm mx-auto">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/30 text-2xl">
                                🔖
                            </div>
                            <h3 className="text-lg font-medium font-serif">Your shortlist is empty</h3>
                            <p className="text-muted-foreground text-sm">
                                Jobs you save from your dashboard will appear here for easy access.
                            </p>
                            <div className="pt-2">
                                <Link href="/dashboard">
                                    <Button variant="secondary" size="sm">Explore Dashboard</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                )}

                <JobDetailsModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApply={(url) => window.open(url, '_blank')}
                />

                <Toast
                    message={toast.message}
                    isVisible={toast.visible}
                    onClose={() => setToast(prev => ({ ...prev, visible: false }))}
                />
            </div>
        </AppLayout>
    );
}
