"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Settings() {
    return (
        <AppLayout>
            <div className="py-6 space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
                <ContextHeader
                    title="Tracking Preferences"
                    description="Define exactly what you're looking for. We filter out the noise."
                />

                <div className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">Role Configuration</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Role Keywords</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Engineer, React Developer"
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">Separate multiple keywords with commas.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Experience Level</label>
                                <select className="w-full">
                                    <option>Entry Level (0-2 years)</option>
                                    <option>Mid Level (3-5 years)</option>
                                    <option>Senior (5+ years)</option>
                                    <option>Staff / Principal</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">Location & Type</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Preferred Locations</label>
                                <input
                                    type="text"
                                    placeholder="e.g. San Francisco, New York, Remote"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Work Mode</label>
                                <div className="flex gap-4 pt-1">
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                                        Remote
                                    </label>
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                                        Hybrid
                                    </label>
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                                        Onsite
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary">Cancel</Button>
                        <Button variant="primary">Save Preferences</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
