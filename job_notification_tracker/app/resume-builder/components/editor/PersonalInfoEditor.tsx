import { Card } from "@/components/ui/Card";
import { ResumeData } from "../../types";

interface PersonalInfoEditorProps {
    data: ResumeData['personalInfo'];
    onChange: (field: string, value: string) => void;
}

export function PersonalInfoEditor({ data, onChange }: PersonalInfoEditorProps) {
    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    value={data.fullName}
                    onChange={(e) => onChange("fullName", e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary col-span-2 md:col-span-1"
                />
                <input
                    value={data.role || ""}
                    onChange={(e) => onChange("role", e.target.value)}
                    placeholder="Desired Role (e.g., Software Engineer)"
                    className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary col-span-2 md:col-span-1"
                />
                <input
                    value={data.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    value={data.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="Phone Number"
                    className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    value={data.location}
                    onChange={(e) => onChange("location", e.target.value)}
                    placeholder="Location (City, Country)"
                    className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary col-span-2"
                />
            </div>
        </Card>
    );
}
