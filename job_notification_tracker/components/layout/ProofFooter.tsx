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
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 md:gap-0">
                <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4">
                    <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        Validation Proof
                    </div>
                    {/* Mobile counter shows here */}
                    <div className="md:hidden text-xs text-muted-foreground">
                        {Object.values(checks).filter(Boolean).length} / 4
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground whitespace-nowrap">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                            checked={checks.uiFn}
                            onChange={() => toggle('uiFn')}
                        />
                        UI Built
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground whitespace-nowrap">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                            checked={checks.logicFn}
                            onChange={() => toggle('logicFn')}
                        />
                        Logic Working
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground whitespace-nowrap">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                            checked={checks.testsPass}
                            onChange={() => toggle('testsPass')}
                        />
                        Test Passed
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors text-muted-foreground whitespace-nowrap">
                        <input
                            type="checkbox"
                            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                            checked={checks.deployed}
                            onChange={() => toggle('deployed')}
                        />
                        Deployed
                    </label>
                </div>

                <div className="hidden md:block w-24 text-right text-xs text-muted-foreground">
                    {Object.values(checks).filter(Boolean).length} / 4
                </div>
            </div>
        </div>
    );
}
