"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';


interface FilterBarProps {
    onSearch: (term: string) => void;
    onFilterChange: (type: string, value: string) => void;
    showMatchesOnly: boolean;
    onToggleMatches: () => void;
    onClearFilters: () => void;
    filters: {
        location: string;
        experience: string;
        mode: string;
        source: string;
        status: string;
        sort: string;
    };
    search: string;
}

export function FilterBar({ onSearch, onFilterChange, showMatchesOnly, onToggleMatches, onClearFilters, filters, search }: FilterBarProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const hasActiveFilters = search || filters.location || filters.experience || filters.mode || filters.source || filters.status || filters.sort !== 'latest' || showMatchesOnly;

    return (
        <Card className="p-4 bg-background sticky top-20 z-30 shadow-sm border-b border-border/50">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search & Mobile Toggle */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search role or company..."
                                value={search}
                                className="w-full px-4 py-2 rounded-md border border-border focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="md:hidden px-3"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span className="sr-only">Toggle Filters</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className={`flex flex-wrap gap-2 flex-1 ${isExpanded ? 'flex' : 'hidden md:flex'}`}>
                        <select
                            value={filters.location}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full md:w-auto"
                            onChange={(e) => onFilterChange('location', e.target.value)}
                        >
                            <option value="">All Locations</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Remote">Remote</option>
                        </select>

                        <select
                            value={filters.experience}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full md:w-auto"
                            onChange={(e) => onFilterChange('experience', e.target.value)}
                        >
                            <option value="">Any Experience</option>
                            <option value="Internship">Internship</option>
                            <option value="Fresher">Fresher (0-1)</option>
                            <option value="1-3 Years">1-3 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                        </select>

                        <select
                            value={filters.mode}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full md:w-auto"
                            onChange={(e) => onFilterChange('mode', e.target.value)}
                        >
                            <option value="">Any Mode</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                        </select>

                        <select
                            value={filters.source}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full md:w-auto"
                            onChange={(e) => onFilterChange('source', e.target.value)}
                        >
                            <option value="">All Sources</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Naukri">Naukri</option>
                            <option value="Indeed">Indeed</option>
                            <option value="Company Site">Company Site</option>
                        </select>

                        <select
                            value={filters.sort}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer "
                            onChange={(e) => onFilterChange('sort', e.target.value)}
                        >
                            <option value="latest">Latest</option>
                            <option value="match_score">Match Score</option>
                            <option value="oldest">Oldest</option>
                        </select>

                        <select
                            value={filters.status}
                            className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full md:w-auto"
                            onChange={(e) => onFilterChange('status', e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>
                </div>

                {/* Intelligent Toggle & Clear */}
                <div className={`flex items-center justify-between pt-1 border-t border-border/40 ${isExpanded ? 'flex' : 'hidden md:flex'}`}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={showMatchesOnly}
                                onChange={onToggleMatches}
                            />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${showMatchesOnly ? 'bg-primary' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showMatchesOnly ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <span className={`font-medium ${showMatchesOnly ? 'text-primary' : 'text-muted-foreground'}`}>
                            Show only jobs matches above threshold
                        </span>
                    </label>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2 text-xs"
                        >
                            Clear All Filters ✕
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
