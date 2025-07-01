import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function FeedbackSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="turnOffFeedbacks" />
      <Label htmlFor="turnOffFeedbacks">Turn off Feedbacks</Label>
    </div>
  )
}
