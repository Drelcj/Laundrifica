// src/app/dashboard/user/overview-client.tsx
'use client'

import { Profile } from "@/types/app" // Import our Profile type

// Define the props this component will receive from the server
type OverviewClientProps = {
    profile: Profile | null;
    activeOrderCount: number;
    // We can add more props here as we fetch more data
}

export function OverviewClient({ profile, activeOrderCount }: OverviewClientProps) {
    const membershipStatus = profile?.membership || 'standard';

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome back, {profile?.full_name || 'User'}! Here’s an overview of your laundry services.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* --- CARD WITH REAL DATA --- */}
                <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Active Orders</h3>
                    <p className="text-2xl font-bold">{activeOrderCount}</p>
                    {/* You can add more logic for '% from last week' later */}
                </div>

                {/* --- CARD WITH REAL DATA --- */}
                <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Membership</h3>
                    <p className="text-2xl font-bold capitalize">{membershipStatus}</p>
                    <p className="text-xs text-muted-foreground">
                        {membershipStatus === 'premium' ? 'Premium benefits enabled' : 'Standard member'}
                    </p>
                </div>

                {/* Other dummy cards can remain for now */}
                <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Upcoming Services</h3>
                    <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Loyalty Points</h3>
                    <p className="text-2xl font-bold">0</p>
                </div>
            </div>

            {/* Recent Orders section to be implemented later */}
            <div>
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <div className="p-8 mt-4 text-center border rounded-lg">
                    <p className="text-muted-foreground">You have no recent orders.</p>
                </div>
            </div>
        </div>
    )
}