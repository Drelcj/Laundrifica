"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { UPCOMING_BRANCH_ADDRESS } from "@/lib/contact"
import { submitLocationInterest, type LocationInterestState } from "@/app/actions/location-interest"

const initialState: LocationInterestState = { status: "idle", message: "" }

function SubmitButton({ compact }: { compact?: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} size={compact ? "sm" : "default"} className="w-full">
      {pending ? "Sending…" : "Notify me"}
    </Button>
  )
}

/**
 * Interest capture for the not-yet-open Rumuagholu T-Junction branch.
 * `compact` renders the footer variant; the default is the contact-page variant.
 */
export function LocationInterestForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction] = useActionState(submitLocationInterest, initialState)

  return (
    <div className={cn("space-y-3", compact ? "text-sm" : "space-y-4")}>
      <div className="flex items-start gap-2">
        <MapPin className={cn("text-primary flex-shrink-0", compact ? "h-4 w-4 mt-0.5" : "h-5 w-5 mt-1")} />
        <div>
          <p className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
            {UPCOMING_BRANCH_ADDRESS}
          </p>
          <p className="text-xs uppercase tracking-wide text-primary font-medium">Opening soon</p>
        </div>
      </div>

      {state.status === "success" ? (
        <div className="flex items-start gap-2 text-green-600">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className={compact ? "text-sm" : "text-base"}>{state.message}</p>
        </div>
      ) : (
        <>
          <p className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            We&apos;re opening at Rumuagholu T-Junction. Leave your number and we&apos;ll tell you when pickup starts
            in your area.
          </p>
          <form action={formAction} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor={compact ? "li-name-footer" : "li-name"} className="sr-only">
                Name
              </Label>
              <Input
                id={compact ? "li-name-footer" : "li-name"}
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={compact ? "li-phone-footer" : "li-phone"} className="sr-only">
                Phone number
              </Label>
              <Input
                id={compact ? "li-phone-footer" : "li-phone"}
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="Phone number"
                required
                autoComplete="tel"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={compact ? "li-area-footer" : "li-area"} className="sr-only">
                Your area
              </Label>
              <Input
                id={compact ? "li-area-footer" : "li-area"}
                name="area"
                placeholder="Your area (e.g. Rumuagholu)"
                autoComplete="address-level3"
              />
            </div>
            {state.status === "error" && (
              <p className="text-sm text-destructive" role="alert">
                {state.message}
              </p>
            )}
            <SubmitButton compact={compact} />
          </form>
        </>
      )}
    </div>
  )
}
