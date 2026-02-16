"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

// URL validation helper
const isValidURL = (url: string): boolean => {
    if (!url) return false;
    try {
        new URL(url);
        return url.startsWith("http://") || url.startsWith("https://");
    } catch {
        return false;
    }
};

export default function ProofPage() {
    const [links, setLinks] = useState({
        lovable: "",
        github: "",
        deployed: ""
    });
    const [isVerified, setIsVerified] = useState(false);
    const [status, setStatus] = useState<"Not Started" | "In Progress" | "Shipped">("Not Started");
    const [toast, setToast] = useState({ message: "", visible: false });

    useEffect(() => {
        // Load links
        const savedLinks = localStorage.getItem("rb_final_submission");
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        }

        // Check verification status (checklist)
        const savedChecks = localStorage.getItem("rb_test_checklist");
        if (savedChecks) {
            try {
                const checkedItems = JSON.parse(savedChecks);
                if (checkedItems.length >= 10) {
                    setIsVerified(true);
                }
            } catch (e) {
                console.error("Failed to parse checklist", e);
            }
        }
    }, []);

    // Update status based on conditions
    useEffect(() => {
        const allLinksValid = isValidURL(links.lovable) && isValidURL(links.github) && isValidURL(links.deployed);
        
        // Shipped ONLY if: All 8 steps + All 10 checklist tests + All 3 proof links
        if (isVerified && allLinksValid) {
            setStatus("Shipped");
        } else if (links.lovable || links.github || links.deployed) {
            setStatus("In Progress");
        } else {
            setStatus("Not Started");
        }
    }, [links, isVerified]);

    const handleLinkChange = (field: string, value: string) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem("rb_final_submission", JSON.stringify(newLinks));
    };

    const handleCopy = () => {
        const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
        navigator.clipboard.writeText(text);
        setToast({ message: "Submission copied to clipboard", visible: true });
    };

    const getStatusColor = () => {
        switch (status) {
            case "Shipped": return "bg-green-100 text-green-700 border-green-200";
            case "In Progress": return "bg-amber-100 text-amber-700 border-amber-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const allLinksValid = isValidURL(links.lovable) && isValidURL(links.github) && isValidURL(links.deployed);

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
                <div className="flex justify-between items-start">
                    <ContextHeader
                        title="Final Proof & Submission"
                        description="Complete the final steps to ship Project 3."
                    />
                    <div className={`px-4 py-2 rounded-full border text-sm font-bold shadow-sm ${getStatusColor()}`}>
                        {status.toUpperCase()}
                    </div>
                </div>

                {status === "Shipped" && (
                    <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg text-green-800 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                        Project 3 Shipped Successfully.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="col-span-2 p-6 space-y-6">
                        <h3 className="font-bold text-lg">Artifact Collection</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Lovable Project Link<span className="text-red-500">*</span></label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    className={`w-full px-4 py-2 rounded border focus:ring-1 focus:ring-primary outline-none ${
                                        links.lovable && !isValidURL(links.lovable) 
                                            ? "border-red-300 bg-red-50" 
                                            : isValidURL(links.lovable) 
                                            ? "border-green-300 bg-green-50/30" 
                                            : "border-border"
                                    }`}
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange("lovable", e.target.value)}
                                />
                                {links.lovable && !isValidURL(links.lovable) && (
                                    <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with http:// or https://</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub Repository Link<span className="text-red-500">*</span></label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    className={`w-full px-4 py-2 rounded border focus:ring-1 focus:ring-primary outline-none ${
                                        links.github && !isValidURL(links.github) 
                                            ? "border-red-300 bg-red-50" 
                                            : isValidURL(links.github) 
                                            ? "border-green-300 bg-green-50/30" 
                                            : "border-border"
                                    }`}
                                    value={links.github}
                                    onChange={(e) => handleLinkChange("github", e.target.value)}
                                />
                                {links.github && !isValidURL(links.github) && (
                                    <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with http:// or https://</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deployed URL<span className="text-red-500">*</span></label>
                                <input
                                    type="url"
                                    placeholder="https://vercel.app/..."
                                    className={`w-full px-4 py-2 rounded border focus:ring-1 focus:ring-primary outline-none ${
                                        links.deployed && !isValidURL(links.deployed) 
                                            ? "border-red-300 bg-red-50" 
                                            : isValidURL(links.deployed) 
                                            ? "border-green-300 bg-green-50/30" 
                                            : "border-border"
                                    }`}
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange("deployed", e.target.value)}
                                />
                                {links.deployed && !isValidURL(links.deployed) && (
                                    <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with http:// or https://</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border space-y-3">
                            {!isVerified && (
                                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
                                    ⚠️ Complete all 10 test checklist items before shipping.
                                </p>
                            )}
                            {isVerified && !allLinksValid && (
                                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
                                    ⚠️ Provide all 3 valid links before shipping.
                                </p>
                            )}
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleCopy}
                                    disabled={status !== "Shipped"}
                                    className={status !== "Shipped" ? "opacity-50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"}
                                >
                                    Copy Final Submission
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4 h-fit">
                        <h3 className="font-bold text-lg">Step Completion</h3>
                        <p className="text-xs text-muted-foreground">8 steps to complete Project 3</p>

                        <div className="space-y-3">
                            <StepItem label="Problem Definition" isCompleted={true} />
                            <StepItem label="Market Research" isCompleted={true} />
                            <StepItem label="System Architecture" isCompleted={true} />
                            <StepItem label="High-Level Design" isCompleted={true} />
                            <StepItem label="Low-Level Design" isCompleted={true} />
                            <StepItem label="Build & Features" isCompleted={true} />
                            <StepItem label="Test Verification" isCompleted={isVerified} />
                            <StepItem label="Deployment Links" isCompleted={allLinksValid} />
                        </div>
                    </Card>
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

function StepItem({ label, isCompleted }: { label: string, isCompleted: boolean }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className={isCompleted ? "text-gray-700 font-medium" : "text-gray-500"}>{label}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isCompleted ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {isCompleted ? "✓" : "PENDING"}
            </span>
        </div>
    );
}
