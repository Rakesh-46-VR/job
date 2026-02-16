"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";

const TEST_ITEMS = [
    { id: 1, label: "Landing page loads without errors", hint: "Check F12 console" },
    { id: 2, label: "Resume editor accepts text input", hint: "Type in all fields" },
    { id: 3, label: "JD analyzer shows mock results", hint: "Paste sample JD" },
    { id: 4, label: "ATS score displays correctly", hint: "Should show 0-100 score" },
    { id: 5, label: "Responsive on mobile (360px width)", hint: "Use DevTools device mode" },
    { id: 6, label: "Export button is present", hint: "May not work yet, just UI" },
    { id: 7, label: "Navigation works between pages", hint: "Click all nav links" },
    { id: 8, label: "Forms validate required fields", hint: "Submit empty forms" },
    { id: 9, label: "Loading states work properly", hint: "Check spinners/placeholders" },
    { id: 10, label: "No TypeScript errors", hint: "Check build output" }
];

export default function TestPage() {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("rb_test_checklist");
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
    }, []);

    const toggleItem = (id: number) => {
        const newChecked = checkedItems.includes(id)
            ? checkedItems.filter(item => item !== id)
            : [...checkedItems, id];

        setCheckedItems(newChecked);
        localStorage.setItem("rb_test_checklist", JSON.stringify(newChecked));
    };

    const resetTests = () => {
        if (confirm("Reset all test progress?")) {
            setCheckedItems([]);
            localStorage.removeItem("rb_test_checklist");
        }
    };

    const allPassed = checkedItems.length === TEST_ITEMS.length;
    const progress = Math.round((checkedItems.length / TEST_ITEMS.length) * 100);

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
                <ContextHeader
                    title="Testing & Verification"
                    description="Verify all functionality works as expected."
                />

                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Test Progress</h3>
                            <p className="text-sm text-muted-foreground">
                                {allPassed ? "All tests passed! 🎉" : "Complete all tests to proceed."}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-primary">{progress}%</div>
                            <button
                                onClick={resetTests}
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1"
                            >
                                <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </Card>

                {!allPassed && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3 text-amber-800">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">Complete all 10 tests to unlock the shipping route.</span>
                    </div>
                )}

                <div className="space-y-3">
                    {TEST_ITEMS.map((item) => (
                        <Card
                            key={item.id}
                            className={`p-4 cursor-pointer transition-all ${
                                checkedItems.includes(item.id)
                                    ? 'border-green-200 bg-green-50/50'
                                    : 'hover:border-primary/30'
                            }`}
                            onClick={() => toggleItem(item.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                                    checkedItems.includes(item.id)
                                        ? 'bg-green-500 border-green-600 text-white'
                                        : 'bg-white border-gray-300'
                                }`}>
                                    {checkedItems.includes(item.id) && <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-medium ${
                                        checkedItems.includes(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                                    }`}>
                                        {item.label}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">💡 {item.hint}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-between pt-4">
                    <Link href="/resume-builder">
                        <Button variant="outline">← Back to Resume Builder</Button>
                    </Link>
                    <Link href="/rb/08-ship">
                        <Button disabled={!allPassed} className={!allPassed ? 'opacity-50 cursor-not-allowed' : ''}>
                            Proceed to Ship →
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
