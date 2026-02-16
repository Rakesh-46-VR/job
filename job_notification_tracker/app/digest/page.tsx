"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { JOBS_DATA } from "@/data/jobs";
import { calculateMatchScore, UserPreferences, getMatchScoreColor } from "@/utils/matchScore";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";


interface ScoredJob extends Job {
    matchScore: number;
}

export default function Digest() {
    const [digest, setDigest] = useState<ScoredJob[] | null>(null);
    const [prefs, setPrefs] = useState<UserPreferences | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [generatedAt, setGeneratedAt] = useState<string>("");

    useEffect(() => {
        // Load prefs
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }

        // Check for today's digest
        const today = new Date().toISOString().split('T')[0];
        const digestKey = `jobTrackerDigest_${today}`;
        const savedDigest = localStorage.getItem(digestKey);

        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
            setGeneratedAt(today);
        }

        setIsLoading(false);
    }, []);

    const generateDigest = () => {
        if (!prefs) return;

        setIsLoading(true);

        // Simulate processing delay
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0];
            const digestKey = `jobTrackerDigest_${today}`;

            const scoredJobs: ScoredJob[] = JOBS_DATA.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, prefs)
            }));

            // Filter relevant jobs (e.g. at least some match score or just top score)
            // Let's take broader set to ensure we have content, but sort heavily
            const relevantJobs = scoredJobs.filter(job => job.matchScore > 0);

            // Sort: Match Score Desc, then Date Asc (fresher first)
            relevantJobs.sort((a, b) => {
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            // Take top 10
            const top10 = relevantJobs.slice(0, 10);

            localStorage.setItem(digestKey, JSON.stringify(top10));
            setDigest(top10);
            setGeneratedAt(today);
            setIsLoading(false);
        }, 800);
    };

    const copyToClipboard = () => {
        if (!digest) return;
        const text = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} (${job.mode})\n   Match: ${job.matchScore}%\n   Apply: ${job.applyUrl}`
        ).join('\n\n');

        navigator.clipboard.writeText(`Here is your Daily Job Digest for ${generatedAt}:\n\n${text}`);
        alert("Digest copied to clipboard!");
    };

    const createEmailDraft = () => {
        if (!digest) return;
        const subject = `My 9AM Job Digest - ${generatedAt}`;
        const body = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}%0D%0A   Location: ${job.location} (${job.mode})%0D%0A   Match: ${job.matchScore}%%0D%0A   Apply: ${job.applyUrl}`
        ).join('%0D%0A%0D%0A');

        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    if (isLoading) {
        return (
            <AppLayout>
                <div className="py-24 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse">Loading digest...</p>
                </div>
            </AppLayout>
        );
    }

    if (!prefs) {
        return (
            <AppLayout>
                <div className="py-6 space-y-8 animate-in fade-in max-w-2xl mx-auto">
                    <ContextHeader title="Daily Digest" description="Your personalized summary." />
                    <Card className="p-8 text-center space-y-4 bg-amber-50 border-amber-200">
                        <span className="text-4xl">⚙️</span>
                        <h3 className="text-xl font-serif font-bold text-amber-900">Preferences Required</h3>
                        <p className="text-amber-800">We can't generate a personalized digest without knowing what you're looking for.</p>
                        <Link href="/settings">
                            <Button variant="primary">Set Preferences</Button>
                        </Link>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
                <ContextHeader
                    title="Daily Digest"
                    description="Your personalized summary of relevant job updates and insights."
                />

                {!digest ? (
                    <Card className="min-h-[300px] flex flex-col justify-center items-center border-dashed border-2 border-border/50 bg-background/50 p-8">
                        <div className="text-center space-y-6 max-w-md mx-auto">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                                📬
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold font-serif">Ready for your morning update?</h3>
                                <p className="text-muted-foreground">
                                    Generate your personalized list of top 10 potential matches for today.
                                </p>
                            </div>
                            <Button onClick={generateDigest} size="lg" className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all">
                                Generate Today's 9AM Digest (Simulated)
                            </Button>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest pt-4 opacity-70">
                                Demo Mode: Daily 9AM trigger simulated manually
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Digest Content - Email Style */}
                        <div className="bg-white border border-border shadow-sm rounded-lg overflow-hidden">
                            {/* Email Header */}
                            <div className="bg-primary/5 p-8 text-center border-b border-border/50">
                                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">Daily Update</span>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Top 10 Jobs For You</h2>
                                <p className="text-muted-foreground mt-2">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • 9AM Digest</p>
                            </div>

                            {/* Digest Body */}
                            <div className="p-0 md:p-8 space-y-0 md:space-y-4 bg-slate-50/50">
                                {digest.length > 0 ? (
                                    digest.map((job, index) => (
                                        <div key={job.id} className="group bg-white p-5 md:rounded-lg border-b md:border border-border hover:shadow-md transition-all flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                            <div className="flex gap-4 items-start">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                                                        <span className="font-medium text-foreground/80">{job.company}</span>
                                                        <span>•</span>
                                                        <span>{job.location}</span>
                                                        <span>•</span>
                                                        <span>{job.experience}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full md:w-auto pl-12 md:pl-0 justify-between md:justify-end">
                                                <div className={`px-2 py-1 rounded text-xs font-bold border ${getMatchScoreColor(job.matchScore || 0)}`}>
                                                    {job.matchScore}% Match
                                                </div>
                                                <Button size="sm" variant="outline" onClick={() => window.open(job.applyUrl, '_blank')}>
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-muted-foreground">
                                        <p>No matching roles found today. Try adjusting your preferences.</p>
                                    </div>
                                )}
                            </div>

                            {/* Email Footer */}
                            <div className="bg-secondary/10 p-6 text-center text-xs text-muted-foreground">
                                <p>This digest was generated based on your preferences.</p>
                                <p className="mt-2">You are receiving this because you enabled daily notifications.</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border border-border shadow-sm">
                            <span className="text-sm font-medium text-muted-foreground">Digest Actions:</span>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" onClick={copyToClipboard} className="flex-1 md:flex-none">
                                    📋 Copy to Clipboard
                                </Button>
                                <Button variant="secondary" onClick={createEmailDraft} className="flex-1 md:flex-none">
                                    ✉️ Create Email Draft
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
