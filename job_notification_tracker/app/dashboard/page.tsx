"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { JobCard } from "@/components/ui/JobCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { JobDetailsModal } from "@/components/ui/JobDetailsModal";
import { JOBS_DATA } from "@/data/jobs";
import { Job } from "@/types/job";
import { useState, useEffect, useMemo } from "react";
import { UserPreferences, calculateMatchScore } from "@/utils/matchScore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Toast } from "@/components/ui/Toast";


export default function Dashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [jobStatus, setJobStatus] = useState<Record<string, string>>({});
    const [prefs, setPrefs] = useState<UserPreferences | null>(null);
    const [toast, setToast] = useState({ message: "", visible: false });

    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        experience: "",
        mode: "",
        source: "",
        status: "",
        sort: "latest"
    });
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);

    // Modal State
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load Data & Preferences
    useEffect(() => {
        setJobs(JOBS_DATA);

        // Load saved jobs
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobs(JSON.parse(saved));
        }

        // Load Job Statuses
        const statuses = localStorage.getItem('jobTrackerStatus');
        if (statuses) {
            setJobStatus(JSON.parse(statuses));
        }

        // Load Preferences
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }
        setIsLoading(false);
    }, []);

    const handleStatusChange = (id: string, newStatus: string) => {
        const updated = { ...jobStatus, [id]: newStatus };
        setJobStatus(updated);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updated));

        // Log history for Digest
        if (newStatus !== 'Not Applied') {
            const historyItem = {
                jobId: id,
                jobTitle: jobs.find(j => j.id === id)?.title || 'Job',
                company: jobs.find(j => j.id === id)?.company || 'Company',
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

    // Filter Logic
    const filteredJobs = useMemo(() => {
        let result = jobs.map(job => {
            // Calculate score if prefs exist
            const score = prefs ? calculateMatchScore(job, prefs) : 0;
            return { ...job, matchScore: score };
        });

        // Search
        if (search) {
            const term = search.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(term) ||
                job.company.toLowerCase().includes(term)
            );
        }

        // Dropdowns
        if (filters.location) result = result.filter(job => job.location.includes(filters.location));
        if (filters.experience) result = result.filter(job => job.experience === filters.experience);
        if (filters.mode) result = result.filter(job => job.mode === filters.mode);
        if (filters.source) result = result.filter(job => job.source === filters.source);

        // Status Filter
        if (filters.status) {
            result = result.filter(job => {
                const currentStatus = jobStatus[job.id] || 'Not Applied';
                return currentStatus === filters.status;
            });
        }

        // Match Toggle
        if (showMatchesOnly && prefs) {
            result = result.filter(job => (job.matchScore || 0) >= prefs.minMatchScore);
        }

        // Sort
        if (filters.sort === 'latest') {
            result = [...result].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (filters.sort === 'match_score') {
            result = [...result].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else if (filters.sort === 'oldest') {
            result = [...result].sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        }

        return result;
    }, [jobs, search, filters, showMatchesOnly, prefs, jobStatus]);


    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const handleClearFilters = () => {
        setSearch("");
        setFilters({
            location: "",
            experience: "",
            mode: "",
            source: "",
            status: "",
            sort: "latest"
        });
        setShowMatchesOnly(false);
    };

    const handleSave = (id: string) => {
        let newSaved;
        if (savedJobs.includes(id)) {
            newSaved = savedJobs.filter(jobId => jobId !== id);
        } else {
            newSaved = [...savedJobs, id];
        }
        setSavedJobs(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500">
                <ContextHeader
                    title="Activity Dashboard"
                    description="Your central command for job tracking and updates."
                />

                {isLoading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <div className="text-lg text-primary font-medium animate-pulse">
                            Curating jobs as per your preferences...
                        </div>
                    </div>
                ) : (
                    <>
                        {!prefs ? (
                            <Card className="bg-amber-50 border-amber-200 p-4">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <h3 className="font-bold text-amber-900">Set your preferences to activate intelligent matching.</h3>
                                        <p className="text-sm text-amber-700">Configure your target roles and skills to see match scores.</p>
                                    </div>
                                    <Link href="/settings">
                                        <Button variant="secondary" className="whitespace-nowrap bg-white text-amber-900 border-amber-300 hover:bg-amber-50">
                                            Configure Preferences
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ) : null}

                        <FilterBar
                            search={search}
                            filters={filters}
                            onSearch={setSearch}
                            onFilterChange={handleFilterChange}
                            showMatchesOnly={showMatchesOnly}
                            onToggleMatches={() => setShowMatchesOnly(!showMatchesOnly)}
                            onClearFilters={handleClearFilters}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job: any) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        matchScore={prefs ? job.matchScore : undefined}
                                        onView={handleView}
                                        onSave={handleSave}
                                        isSaved={savedJobs.includes(job.id)}
                                        status={(jobStatus[job.id] as any) || 'Not Applied'}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <span className="text-4xl">🔍</span>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg">No roles match your criteria</h3>
                                        <p className="text-muted-foreground">Adjust your filters or lower your match threshold.</p>
                                    </div>
                                    <Button variant="outline" onClick={() => setShowMatchesOnly(false)}>
                                        Show All Jobs
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
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
