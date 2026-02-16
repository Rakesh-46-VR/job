
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    X,
    LayoutDashboard,
    Code,
    FileCheck,
    BookOpen,
    User,
    GraduationCap,
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navLinks = [
        {
            name: "Dashboard",
            href: "/placement/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Practice",
            href: "/placement/dashboard/practice",
            icon: Code,
        },
        {
            name: "Assessments",
            href: "/placement/dashboard/assessments",
            icon: FileCheck,
        },
        {
            name: "Detailed Analysis",
            href: "/placement/dashboard/analysis",
            icon: FileCheck,
        },
        {
            name: "Resources",
            href: "/placement/dashboard/resources",
            icon: BookOpen,
        },
        {
            name: "Profile",
            href: "/placement/dashboard/profile",
            icon: User,
        },
    ];

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-background font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-4 lg:px-6 shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 rounded-md hover:bg-secondary/10 text-muted-foreground"
                        aria-label="Toggle Navigation"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center gap-2 font-serif font-bold text-xl text-primary">
                        <GraduationCap className="w-8 h-8" />
                        <span>Vantage</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-sm font-medium text-muted-foreground">
                        Welcome, Candidate
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Layout Area */}
            <div className="flex flex-1 pt-16 h-full">
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-20 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col pt-16 lg:pt-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary/10 text-primary font-bold"
                                        : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground"
                                        }`}
                                >
                                    <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}
