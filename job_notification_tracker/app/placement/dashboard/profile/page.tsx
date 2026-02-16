
import { User, Mail, Briefcase, MapPin } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-serif text-foreground text-center">My Profile</h1>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mb-4 border-2 border-primary/20">
                        JD
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
                    <p className="text-muted-foreground">Aspiring Full Stack Engineer</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:bg-secondary/10 transition-colors">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Email</p>
                            <p className="text-foreground font-medium">john.doe@example.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:bg-secondary/10 transition-colors">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Role</p>
                            <p className="text-foreground font-medium">Student / Job Seeker</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:bg-secondary/10 transition-colors">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase">Location</p>
                            <p className="text-foreground font-medium">Bangalore, India</p>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:brightness-110 transition-all shadow-md mt-4">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
