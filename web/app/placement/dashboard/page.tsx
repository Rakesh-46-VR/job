
"use client";

import React, { PureComponent } from 'react';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend
} from 'recharts';
import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    TrendingUp,
    Clock,
    BookOpen
} from 'lucide-react';
import { Card } from "@/components/ui/Card";

// Mock Data for Radar Chart
const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

// Helper components to mimic shadcn/ui structure inside the page for now
const CardHeader = ({ className = "", children }: { className?: string, children: React.ReactNode }) => (
    <div className={`flex flex-col space-y-1.5 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }: { className?: string, children: React.ReactNode }) => (
    <h3 className={`font-serif font-bold text-foreground leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardContent = ({ className = "", children }: { className?: string, children: React.ReactNode }) => (
    <div className={`p-0 ${className}`}>{children}</div>
);


export default function DashboardPage() {
    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Track your progress and stay on target.</p>
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full border border-border shadow-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                {/* Left Column */}
                <div className="space-y-4 sm:space-y-6">

                    {/* Overall Readiness */}
                    <Card className="flex flex-col items-center justify-center py-6 sm:py-8 bg-card border-border">
                        <CardHeader className="w-full text-center pb-2">
                            <CardTitle className="text-lg sm:text-xl">Overall Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                                {/* Custom SVG Circle with animation */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="72"
                                        stroke="#e5e5e5"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="sm:hidden"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="72"
                                        stroke="#8B0000"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 72}
                                        strokeDashoffset={2 * Math.PI * 72 * (1 - 0.72)}
                                        strokeLinecap="round"
                                        className="text-primary transition-all duration-1000 ease-out sm:hidden"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="#e5e5e5"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="hidden sm:block"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="#8B0000"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 88}
                                        strokeDashoffset={2 * Math.PI * 88 * (1 - 0.72)}
                                        strokeLinecap="round"
                                        className="text-primary transition-all duration-1000 ease-out hidden sm:block"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl sm:text-5xl font-bold text-foreground">72</span>
                                    <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Score</span>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-muted-foreground max-w-xs text-sm">
                                You're in the top 28% of candidates! Keep pushing to reach 85+.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Weekly Goals */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Weekly Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-foreground">Problems Solved</span>
                                    <span className="text-sm font-bold text-primary">12 / 20</span>
                                </div>
                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                        style={{ width: '60%' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Activity Streak</span>
                                <div className="flex justify-between items-center px-2">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                          ${[0, 1, 2, 4].includes(i)
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'bg-transparent text-muted-foreground border-border'
                                                    }`}
                                            >
                                                {day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">

                    {/* Skill Breakdown Chart */}
                    <Card className="min-h-75 bg-card border-border">
                        <CardHeader>
                            <CardTitle>Skill Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="h-75 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                    <PolarGrid stroke="#e5e5e5" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6C6C6C', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="My Skills"
                                        dataKey="A"
                                        stroke="#8B0000"
                                        fill="#8B0000"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Continue Practice */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                Continue Practice
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-background rounded-lg p-4 border border-border">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-bold text-foreground">Dynamic Programming</h4>
                                        <p className="text-sm text-muted-foreground">Last visited: 2 hours ago</p>
                                    </div>
                                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                                        Hard
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
                                        <span>Progress</span>
                                        <span>3 / 10</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: '30%' }}
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-2 bg-card border border-border rounded-md text-sm font-semibold text-foreground hover:bg-secondary/20 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                    Continue Session <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Assessments */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Upcoming Assessments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "DSA Mock Test",
                                        time: "Tomorrow, 10:00 AM",
                                        icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
                                        color: "bg-background border-border"
                                    },
                                    {
                                        title: "System Design Review",
                                        time: "Wed, 2:00 PM",
                                        icon: <Clock className="w-5 h-5 text-primary" />,
                                        color: "bg-background border-border"
                                    },
                                    {
                                        title: "HR Interview Prep",
                                        time: "Friday, 11:00 AM",
                                        icon: <BookOpen className="w-5 h-5 text-primary" />,
                                        color: "bg-background border-border"
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg border ${item.color} transition-transform hover:scale-[1.01] hover:bg-secondary/10`}>
                                        <div className="bg-white p-2 rounded-full shadow-sm border border-border">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground font-medium">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
