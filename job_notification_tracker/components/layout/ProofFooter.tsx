import React, { useState } from 'react';

export function ProofFooter() {
    const [checks, setChecks] = useState({
        uiFn: false,
        logicFn: false,
        testsPass: false,
        deployed: false,
    });

    const toggle = (key: keyof typeof checks) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur p-4 z-40">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                    Validation Proof
                </div>

                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary"
                            checked={checks.uiFn}
                            onChange={() => toggle('uiFn')}
                        />
                        UI Built
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary"
                            checked={checks.logicFn}
                            onChange={() => toggle('logicFn')}
                        />
                        Logic Working
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary"
                            checked={checks.testsPass}
                            onChange={() => toggle('testsPass')}
                        />
                        Test Passed
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary"
                            checked={checks.deployed}
                            onChange={() => toggle('deployed')}
                        />
                        Deployed
                    </label>
                </div>

                <div className="w-24 text-right text-xs text-muted-foreground">
                    {Object.values(checks).filter(Boolean).length} / 4
                </div>
            </div>
        </div>
    );
}
