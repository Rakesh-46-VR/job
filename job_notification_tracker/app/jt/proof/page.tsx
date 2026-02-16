"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

export default function ProofPage() {
    const [links, setLinks] = useState({
        lovable: "",
        github: "",
        deployed: ""
    });
    const [isVerified, setIsVerified] = useState(false);
    const [status, setStatus] = useState("Not Started");
    const [toast, setToast] = useState({ message: "", visible: false });

    useEffect(() => {
        // Load links
        const savedLinks = localStorage.getItem("projectSubmission");
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        }

        // Check verification status
        const savedChecks = localStorage.getItem("testChecklist");
        if (savedChecks) {
            const checks = JSON.parse(savedChecks);
            const passedCount = Object.values(checks).filter(Boolean).length;
            if (passedCount >= 10) {
                setIsVerified(true);
            }
        }
    }, []);

    useEffect(() => {
        // Update status logic
        const hasLinks = links.lovable && links.github && links.deployed;
        if (isVerified && hasLinks) {
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
        localStorage.setItem("projectSubmission", JSON.stringify(newLinks));
    };

    const handleCopy = () => {
        const text = `Job Notification Tracker — Final Submission\n\nLovable Project:\n${links.lovable}\n\nGitHub Repository:\n${links.github}\n\nLive Deployment:\n${links.deployed}\n\nCore Features:\n- Intelligent match scoring\n- Daily digest simulation\n- Status tracking\n- Test checklist enforced`;
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

    return (
        <AppLayout>
            <div className="py-6 space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
                <div className="flex justify-between items-start">
                    <ContextHeader
                        title="Final Proof & Submission"
                        description="Complete the final steps to ship Project 1."
                    />
                    <div className={`px-4 py-2 rounded-full border text-sm font-bold shadow-sm ${getStatusColor()}`}>
                        {status.toUpperCase()}
                    </div>
                </div>

                {status === "Shipped" && (
                    <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg text-green-800 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                        Project 1 Shipped Successfully.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="col-span-2 p-6 space-y-6">
                        <h3 className="font-bold text-lg">Artifact Collection</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Lovable Project Link</label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    className="w-full px-4 py-2 rounded border border-border focus:ring-1 focus:ring-primary outline-none"
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange("lovable", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub Repository Link</label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    className="w-full px-4 py-2 rounded border border-border focus:ring-1 focus:ring-primary outline-none"
                                    value={links.github}
                                    onChange={(e) => handleLinkChange("github", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deployed URL</label>
                                <input
                                    type="url"
                                    placeholder="https://vercel.app/..."
                                    className="w-full px-4 py-2 rounded border border-border focus:ring-1 focus:ring-primary outline-none"
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange("deployed", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border flex justify-end">
                            <Button
                                onClick={handleCopy}
                                disabled={status !== "Shipped"}
                                className={status !== "Shipped" ? "opacity-50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"}
                            >
                                Copy Final Submission
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4 h-fit">
                        <h3 className="font-bold text-lg">Step Completion</h3>

                        <div className="space-y-3">
                            <StepItem label="Project Setup" isCompleted={true} />
                            <StepItem label="Job Data & Types" isCompleted={true} />
                            <StepItem label="Dashboard UI" isCompleted={true} />
                            <StepItem label="Match Logic" isCompleted={true} />
                            <StepItem label="Status Tracking" isCompleted={true} />
                            <StepItem label="Digest System" isCompleted={true} />
                            <StepItem label="Test Verification" isCompleted={isVerified} />
                            <StepItem label="Deployment Links" isCompleted={!!(links.lovable && links.github && links.deployed)} />
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
            <span className={`px-2 py-0.5 rounded textxs font-bold ${isCompleted ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {isCompleted ? "DONE" : "PENDING"}
            </span>
        </div>
    );
}
