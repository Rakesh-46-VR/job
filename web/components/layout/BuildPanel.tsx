"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, CheckCircle2, AlertCircle, Upload, ExternalLink } from "lucide-react";
import { Toast } from "@/components/ui/Toast";

interface BuildPanelProps {
    stepNumber: number;
    prompt: string;
    onArtifactSubmit: (data: string) => void;
    hasArtifact: boolean;
    artifactKey: string;
}

export function BuildPanel({ stepNumber, prompt, onArtifactSubmit, hasArtifact, artifactKey }: BuildPanelProps) {
    const [copiedPrompt, setCopiedPrompt] = useState(false);
    const [artifactText, setArtifactText] = useState("");
    const [status, setStatus] = useState<"idle" | "worked" | "error">("idle");
    const [screenshot, setScreenshot] = useState("");
    const [toast, setToast] = useState({ message: "", visible: false });

    useEffect(() => {
        const savedArtifact = localStorage.getItem(artifactKey);
        const savedStatus = localStorage.getItem(`${artifactKey}_status`);
        const savedScreenshot = localStorage.getItem(`${artifactKey}_screenshot`);
        
        if (savedArtifact) setArtifactText(savedArtifact);
        if (savedStatus) setStatus(savedStatus as "idle" | "worked" | "error");
        if (savedScreenshot) setScreenshot(savedScreenshot);
    }, [artifactKey]);

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(true);
        setToast({ message: "Prompt copied to clipboard", visible: true });
        setTimeout(() => setCopiedPrompt(false), 2000);
    };

    const handleSubmitArtifact = () => {
        if (!artifactText.trim()) {
            setToast({ message: "Please paste your artifact first", visible: true });
            return;
        }
        localStorage.setItem(artifactKey, artifactText);
        onArtifactSubmit(artifactText);
        setToast({ message: "Artifact saved successfully", visible: true });
    };

    const handleStatusChange = (newStatus: "worked" | "error") => {
        setStatus(newStatus);
        localStorage.setItem(`${artifactKey}_status`, newStatus);
    };

    const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setScreenshot(result);
                localStorage.setItem(`${artifactKey}_screenshot`, result);
                setToast({ message: "Screenshot uploaded", visible: true });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex-[0.3] border-l border-border bg-muted/30 p-4 overflow-y-auto">
            <div className="space-y-4 max-w-md">
                <h3 className="font-bold text-base">Build Panel</h3>

                {/* Step 1: Copy Prompt */}
                <Card className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">Step {stepNumber} Prompt</h4>
                        <Button
                            onClick={handleCopyPrompt}
                            size="sm"
                            variant="outline"
                            className="h-8"
                        >
                            {copiedPrompt ? (
                                <>
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="bg-muted p-3 rounded text-xs font-mono max-h-32 overflow-y-auto">
                        {prompt.substring(0, 150)}...
                    </div>
                </Card>

                {/* Step 2: Build in Lovable */}
                <Card className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Build in Lovable</h4>
                    <a
                        href="https://lovable.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button className="w-full" variant="primary">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Lovable
                        </Button>
                    </a>
                    <p className="text-xs text-muted-foreground">
                        Paste the prompt into Lovable and generate your artifact.
                    </p>
                </Card>

                {/* Step 3: Paste Artifact */}
                <Card className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Paste Artifact</h4>
                    <textarea
                        placeholder="Paste your generated artifact here..."
                        className="w-full h-32 px-3 py-2 text-sm border border-border rounded resize-none focus:ring-1 focus:ring-primary outline-none"
                        value={artifactText}
                        onChange={(e) => setArtifactText(e.target.value)}
                    />
                    <Button
                        onClick={handleSubmitArtifact}
                        className="w-full"
                        disabled={!artifactText.trim()}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Artifact
                    </Button>
                </Card>

                {/* Step 4: Status */}
                {hasArtifact && (
                    <Card className="p-4 space-y-3">
                        <h4 className="font-semibold text-sm">Build Status</h4>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleStatusChange("worked")}
                                variant={status === "worked" ? "primary" : "outline"}
                                className="flex-1"
                                size="sm"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                It Worked
                            </Button>
                            <Button
                                onClick={() => handleStatusChange("error")}
                                variant={status === "error" ? "secondary" : "outline"}
                                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700"
                                size="sm"
                            >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Error
                            </Button>
                        </div>

                        <div className="pt-2">
                            <label className="block text-xs font-medium mb-2">Add Screenshot (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotUpload}
                                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:brightness-110"
                            />
                            {screenshot && (
                                <div className="mt-2">
                                    <img src={screenshot} alt="Screenshot" className="w-full rounded border border-border" />
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            <Toast
                message={toast.message}
                isVisible={toast.visible}
                onClose={() => setToast(prev => ({ ...prev, visible: false }))}
            />
        </div>
    );
}
