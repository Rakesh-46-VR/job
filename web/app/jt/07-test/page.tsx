"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";

const CHECKLIST_ITEMS = [
    { id: "prefs_persist", label: "Preferences persist after refresh", tip: "Reload page and check Settings." },
    { id: "match_score", label: "Match score calculates correctly", tip: "Verify percentage against preferences." },
    { id: "matches_toggle", label: '"Show only matches" toggle works', tip: "Filter bar toggle hides low scores." },
    { id: "save_persist", label: "Save job persists after refresh", tip: "Save a job, reload, check Saved tab." },
    { id: "apply_tab", label: "Apply opens in new tab", tip: "Click apply button on any job." },
    { id: "status_persist", label: "Status update persists after refresh", tip: "Change status, reload, verify." },
    { id: "status_filter", label: "Status filter works correctly", tip: "Filter by 'Applied', check results." },
    { id: "digest_gen", label: "Digest generates top 10 by score", tip: "Check /digest page logic." },
    { id: "digest_persist", label: "Digest persists for the day", tip: "Reload /digest, same jobs should show." },
    { id: "no_console", label: "No console errors on main pages", tip: "Check F12 Developer Tools." },
];

export default function TestPage() {
    const [checks, setChecks] = useState<Record<string, boolean>>({});
    const [toast, setToast] = useState({ message: "", visible: false });

    useEffect(() => {
        const saved = localStorage.getItem("testChecklist");
        if (saved) {
            setChecks(JSON.parse(saved));
        }
    }, []);

    const toggleCheck = (id: string) => {
        const newChecks = { ...checks, [id]: !checks[id] };
        setChecks(newChecks);
        localStorage.setItem("testChecklist", JSON.stringify(newChecks));
        
        if (newChecks[id]) {
            setToast({ message: "Test passed!", visible: true });
        }
    };

    const handleReset = () => {
        if (confirm("Reset all test status?")) {
            setChecks({});
            localStorage.removeItem("testChecklist");
            setToast({ message: "Checklist reset.", visible: true });
        }
    };

    const passedCount = Object.values(checks).filter(Boolean).length;
    const allPassed = passedCount === CHECKLIST_ITEMS.length;

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
                <ContextHeader
                    title="System Verification"
                    description="Run through manual checks to verify system integrity."
                />

                <Card className={`p-6 border-2 ${allPassed ? "border-green-100 bg-green-50/30" : "border-amber-100 bg-amber-50/30"}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold">Test Summary</h3>
                            <p className={`text-sm font-medium ${allPassed ? "text-green-600" : "text-amber-600"}`}>
                                {allPassed ? "All Systems Go! 🚀" : "Pre-flight checks incomplete."}
                            </p>
                        </div>
                        <div className="text-2xl font-bold font-mono">
                            {passedCount} / {CHECKLIST_ITEMS.length}
                        </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                            className={`h-2.5 rounded-full transition-all duration-500 ${allPassed ? "bg-green-500" : "bg-amber-500"}`} 
                            style={{ width: `${(passedCount / CHECKLIST_ITEMS.length) * 100}%` }}
                        ></div>
                    </div>
                </Card>

                <div className="space-y-3">
                    {CHECKLIST_ITEMS.map((item) => (
                        <Card 
                            key={item.id}
                            className={`p-4 flex items-start gap-4 transition-colors cursor-pointer hover:border-primary/30 ${checks[item.id] ? "bg-white border-green-200 shadow-sm" : "bg-gray-50/50 border-transparent"}`}
                            onClick={() => toggleCheck(item.id)}
                        >
                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checks[item.id] ? "bg-green-500 border-green-600 text-white" : "bg-white border-gray-300"}`}>
                                {checks[item.id] && "✓"}
                            </div>
                            <div>
                                <h4 className={`font-medium ${checks[item.id] ? "text-gray-900 line-through decoration-green-500/50" : "text-gray-700"}`}>
                                    {item.label}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    💡 {item.tip}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-between pt-6 border-t border-border">
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-red-600">
                        Reset Status
                    </Button>
                    
                    {allPassed ? (
                        <Link href="/jt/08-ship">
                            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200">
                                Proceed to Ship 🚀
                            </Button>
                        </Link>
                    ) : (
                        <Button disabled variant="secondary" className="opacity-50 cursor-not-allowed">
                            Complete Checklist to Ship 🔒
                        </Button>
                    )}
                </div>

                <Toast 
                    message={toast.message} 
                    isVisible={toast.visible} 
                    onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
                />
            </div>
        </AppLayout>
    );
}
