"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { JobCard } from "@/components/ui/JobCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { JobDetailsModal } from "@/components/ui/JobDetailsModal";
import { JOBS_DATA } from "@/data/jobs";
import { Job } from "@/types/job";
import { useState, useEffect, useMemo } from "react";

export default function Dashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<string[]>([]);

    // Filters
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        experience: "",
        mode: "",
        sort: "latest"
    });

    // Modal State
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load Data
    useEffect(() => {
        setJobs(JOBS_DATA);

        // Load saved jobs from localStorage
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobs(JSON.parse(saved));
        }
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = jobs;

        // Search
        if (search) {
            const term = search.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(term) ||
                job.company.toLowerCase().includes(term)
            );
        }

        // Dropdowns
        if (filters.location) {
            result = result.filter(job => job.location.includes(filters.location));
        }
        if (filters.experience) {
            result = result.filter(job => job.experience === filters.experience);
        }
        if (filters.mode) {
            result = result.filter(job => job.mode === filters.mode);
        }

        // Sort
        if (filters.sort === 'latest') {
            result = [...result].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else {
            result = [...result].sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        }

        setFilteredJobs(result);
    }, [jobs, search, filters]);


    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => ({ ...prev, [type]: value }));
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

                <FilterBar onSearch={setSearch} onFilterChange={handleFilterChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onView={handleView}
                                onSave={handleSave}
                                isSaved={savedJobs.includes(job.id)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No jobs found matching your criteria.
                        </div>
                    )}
                </div>

                <JobDetailsModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApply={(url) => window.open(url, '_blank')}
                />
            </div>
        </AppLayout>
    );
}
