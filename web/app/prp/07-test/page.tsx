"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import {
    CheckCircle2,
    AlertTriangle,
    RotateCcw,
    Lock,
    Unlock,
    ClipboardCheck,
    ArrowRight
} from "lucide-react";

// The 10 predefined tests
const TEST_ITEMS = [
    { id: 1, label: "JD required validation works", hint: "Try analyzing with empty JD. Should show error." },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste 'Hiring dev' (10 chars). Verify red warning." },
    { id: 3, label: "Skills extraction groups correctly", hint: "Check if 'React' goes to Web, 'Java' to Languages." },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Compare 'Google' (Enterprise) vs 'Startup Inc' flows." },
    { id: 5, label: "Score calculation is deterministic", hint: "Analyze same JD twice. Score should be identical." },
    { id: 6, label: "Skill toggles update score live", hint: "Toggle 'I know this'. Score must change instantly." },
    { id: 7, label: "Changes persist after refresh", hint: "Toggle skills, refresh page. Selections should remain." },
    { id: 8, label: "History saves and loads correctly", hint: "Check 'History' tab. Click item to load details." },
    { id: 9, label: "Export buttons copy the correct content", hint: "Click 'Copy Plan', paste in Notepad to verify." },
    { id: 10, label: "No console errors on core pages", hint: "Open DevTools (F12) > Console. Should be clean." }
];

export default function TestChecklistPage() {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("prp_test_checklist_status");
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleItem = (id: number) => {
        const newChecked = checkedItems.includes(id)
            ? checkedItems.filter(item => item !== id)
            : [...checkedItems, id];

        setCheckedItems(newChecked);
        localStorage.setItem("prp_test_checklist_status", JSON.stringify(newChecked));
    };

    const resetTests = () => {
        if (confirm("Reset all test progress?")) {
            setCheckedItems([]);
            localStorage.removeItem("prp_test_checklist_status");
        }
    };

    const allPassed = checkedItems.length === TEST_ITEMS.length;
    const progress = Math.round((checkedItems.length / TEST_ITEMS.length) * 100);

    if (!isLoaded) return <div className="p-10 text-center">Loading tests...</div>;

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto space-y-8 py-8 animate-in fade-in duration-500">

                {/* Header Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-foreground flex items-center gap-2">
                            <ClipboardCheck className="w-6 h-6 text-primary" />
                            Pre-Ship Checklist
                        </h1>
                        <p className="text-muted-foreground mt-1">Verify existing functionality before releasing.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm font-medium text-muted-foreground">Tests Passed</div>
                            <div className={`text-3xl font-bold ${allPassed ? 'text-green-600' : 'text-primary'}`}>
                                {checkedItems.length} <span className="text-lg text-muted-foreground font-normal">/ {TEST_ITEMS.length}</span>
                            </div>
                        </div>

                        <div className="h-12 w-12 rounded-full border-4 border-secondary flex items-center justify-center bg-white shadow-sm">
                            {allPassed ? <Unlock className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                        </div>
                    </div>
                </div>

                {/* Status Banner */}
                {!allPassed ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3 text-yellow-800">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <span className="font-medium">Please complete all 10 tests to unlock the shipping route.</span>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between gap-3 text-green-800">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span className="font-medium">All systems go! You are ready to ship.</span>
                        </div>
                        <Link href="/prp/08-ship">
                            <button className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                                Go to Ship <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                )}

                {/* Progress Bar */}
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${allPassed ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Checklist */}
                <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden divide-y divide-border">
                    {TEST_ITEMS.map((item) => {
                        const isChecked = checkedItems.includes(item.id);
                        return (
                            <label
                                key={item.id}
                                className={`flex items-start gap-4 p-5 cursor-pointer hover:bg-secondary/10 transition-colors ${isChecked ? 'bg-primary/5' : ''}`}
                            >
                                <div className="pt-0.5 relative">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleItem(item.id)}
                                        className="appearance-none w-5 h-5 border-2 border-muted-foreground/50 rounded checked:bg-primary checked:border-primary transition-all cursor-pointer"
                                    />
                                    {isChecked && <CheckCircle2 className="w-5 h-5 text-white absolute top-0 left-0 pointer-events-none" />}
                                </div>

                                <div className="flex-1">
                                    <h3 className={`font-medium ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                                        ℹ️ Step: {item.hint}
                                    </p>
                                </div>
                            </label>
                        );
                    })}
                </div>

                {/* Reset Action */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={resetTests}
                        className="text-muted-foreground hover:text-red-500 text-sm flex items-center gap-2 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset Test Status
                    </button>
                </div>

            </div>
        </AppLayout>
    );
}
