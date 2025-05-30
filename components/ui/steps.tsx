"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepProps {
  title: string
}

const StepContext = React.createContext<number>(0)
const CurrentStepContext = React.createContext<number>(0)

export function Step({ title }: StepProps) {
  const stepIndex = React.useContext(StepContext)
  const currentStep = React.useContext(CurrentStepContext)

  const isCompleted = stepIndex < currentStep
  const isCurrent = stepIndex === currentStep

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn("w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm", {
          "bg-primary text-primary-foreground": isCompleted || isCurrent,
          "bg-muted text-muted-foreground": !isCompleted && !isCurrent,
        })}
      >
        {isCompleted ? <Check className="h-5 w-5" /> : stepIndex + 1}
      </div>
      <div className="text-xs mt-2 text-center">{title}</div>
    </div>
  )
}

interface StepsProps {
  currentStep: number
  children: React.ReactNode
  className?: string
}

export function Steps({ currentStep, children, className }: StepsProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={cn("flex-1 h-1 mx-2", {
                "bg-primary": index <= currentStep,
                "bg-muted": index > currentStep,
              })}
            />
          )}
          {React.cloneElement(step as React.ReactElement, {
            stepIndex: index,
            currentStep,
          })}
        </React.Fragment>
      ))}
    </div>
  )
}
