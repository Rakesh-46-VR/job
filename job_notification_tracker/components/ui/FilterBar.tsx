"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FilterBarProps {
    onSearch: (term: string) => void;
    onFilterChange: (type: string, value: string) => void;
}

export function FilterBar({ onSearch, onFilterChange }: FilterBarProps) {
    return (
        <Card className="p-4 bg-background sticky top-20 z-30 shadow-sm border-b border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search role or company..."
                        className="w-full px-4 py-2 rounded-md border border-border focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 flex-1">
                    <select
                        className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer"
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
                        className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                        onChange={(e) => onFilterChange('experience', e.target.value)}
                    >
                        <option value="">Any Experience</option>
                        <option value="Internship">Internship</option>
                        <option value="Fresher">Fresher (0-1)</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                    </select>

                    <select
                        className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                        onChange={(e) => onFilterChange('mode', e.target.value)}
                    >
                        <option value="">Any Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>

                    <select
                        className="px-3 py-2 rounded-md border border-border bg-white text-sm focus:ring-1 focus:ring-primary outline-none cursor-pointer ml-auto"
                        onChange={(e) => onFilterChange('sort', e.target.value)}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </Card>
    );
}
