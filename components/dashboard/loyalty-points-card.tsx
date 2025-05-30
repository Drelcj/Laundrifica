import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Gift } from "lucide-react"

export function LoyaltyPointsCard() {
  // Mock data
  const currentPoints = 450
  const nextRewardThreshold = 500
  const percentage = (currentPoints / nextRewardThreshold) * 100

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-32 h-32">
        <CircularProgressbar
          value={percentage}
          text={`${currentPoints}`}
          styles={buildStyles({
            textSize: "22px",
            pathColor: `hsl(var(--primary))`,
            textColor: "hsl(var(--foreground))",
            trailColor: "hsl(var(--muted))",
          })}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {nextRewardThreshold - currentPoints} points until your next reward
        </p>
        <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <span className="font-medium">Free Delivery Voucher</span>
        </div>
      </div>
      <div className="w-full text-sm">
        <div className="flex justify-between mb-1">
          <span>Earn points</span>
          <span>+10 pts per ₦1,000 spent</span>
        </div>
        <div className="flex justify-between">
          <span>Premium bonus</span>
          <span>+50% more points</span>
        </div>
      </div>
    </div>
  )
}
