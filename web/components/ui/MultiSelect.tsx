"use client";

import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "./Badge";

interface MultiSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
    placeholder?: string;
    creatable?: boolean;
    className?: string;
}

export function MultiSelect({
    value = [],
    onChange,
    options = [],
    placeholder = "Select...",
    creatable = true,
    className = "",
}: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = (item: string) => {
        onChange(value.filter((i) => i !== item));
    };

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "" && value.length > 0) {
                        onChange(value.slice(0, -1)); // Remove the last item
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [value, onChange]
    );

    const selectable = options.filter((i) => !value.includes(i));

    // Filter showing options based on input
    const filteredOptions = selectable.filter(opt =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleSelect = (item: string) => {
        onChange([...value, item]);
        setInputValue("");
    };

    const handleCreate = () => {
        if (inputValue.trim() && !value.includes(inputValue.trim())) {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div
                className="group border border-border px-3 py-2 text-sm rounded-md bg-background flex flex-wrap gap-1 items-center"
                onClick={() => inputRef.current?.focus()}
            >
                {value.map((item) => (
                    <Badge key={item} variant="default" className="gap-1 pr-1">
                        {item}
                        <button
                            className="ml-1 rounded-full outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleUnselect(item);
                                }
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onClick={() => handleUnselect(item)}
                        >
                            <X className="h-3 w-3 text-white hover:text-white/80" />
                        </button>
                    </Badge>
                ))}
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setOpen(true);
                    }}
                    onBlur={() => {
                        // Small timeout to allow click events on dropdown items to fire
                        setTimeout(() => setOpen(false), 200);
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={value.length === 0 ? placeholder : ""}
                    className="ml-1 bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-[60px]"
                    onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData.getData("text");
                        if (pasted) {
                            const newItems = pasted
                                .split(",")
                                .map((s) => s.trim())
                                .filter((s) => {
                                    if (!s) return false;
                                    if (value.includes(s)) return false;
                                    if (creatable) return true;
                                    return options.includes(s);
                                });

                            if (newItems.length > 0) {
                                onChange([...value, ...newItems]);
                                setInputValue("");
                            }
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            const val = inputValue.trim();
                            if (!val) {
                                return;
                            }

                            // 1. Check for exact match in options (case-insensitive)
                            const exactMatch = options.find(
                                (opt) => opt.toLowerCase() === val.toLowerCase()
                            );

                            if (exactMatch) {
                                if (!value.includes(exactMatch)) {
                                    handleSelect(exactMatch);
                                } else {
                                    setInputValue(""); // Already selected, just clear input
                                }
                            } else if (creatable) {
                                // 2. Create if allowed
                                handleCreate();
                            } else if (filteredOptions.length > 0) {
                                // 3. Select first option if not creatable (fallback)
                                handleSelect(filteredOptions[0]);
                            }
                        }
                        handleKeyDown(e);
                    }}
                />
            </div>

            {open && (filteredOptions.length > 0 || (creatable && inputValue.trim())) && (
                <div className="absolute top-full z-50 w-full mt-2 rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                    <div className="max-h-60 overflow-auto p-1 text-sm bg-white rounded-md">
                        {filteredOptions.length === 0 && creatable && inputValue.trim() && (
                            <div
                                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 outline-none text-muted-foreground hover:bg-gray-100/50 transition-colors duration-150"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleCreate();
                                }}
                            >
                                Create "{inputValue}"
                            </div>
                        )}

                        {filteredOptions.map((option) => (
                            <div
                                key={option}
                                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 outline-none bg-white text-neutral-900 hover:bg-gray-100/50 transition-colors duration-150"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleSelect(option);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
