"use client"
import { useState, useEffect } from "react"
import { Card, CardBody } from "@heroui/react"
import { useTheme } from "next-themes"

const CountdownTimer = () => {
  const { theme } = useTheme()
  const calculateTimeLeft = () => {
    const difference =
      new Date("2025-04-30T15:00:00Z").getTime() - new Date().getTime()
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      return { days, hours, minutes, seconds }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <Card className="md:px-6">
      <CardBody className="flex flex-col justify-center items-center gap-3">
        <span className="text-xl font-bold">Presale Ends In</span>
        <div className="flex flex-row justify-center gap-4">
          <div
            className={`flex flex-col items-center shadow-lg ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-md text-neutral-content p-3 min-w-[75px]`}
          >
            <div className="font-bold text-4xl">{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div
            className={`flex flex-col items-center shadow-lg ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-md text-neutral-content p-3 min-w-[75px]`}
          >
            <div className="font-bold text-4xl">{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div
            className={`flex flex-col items-center shadow-lg ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-md text-neutral-content p-3 min-w-[75px]`}
          >
            <div className="font-bold text-4xl">{timeLeft.minutes}</div>
            <div className="text-sm">Min</div>
          </div>
          <div
            className={`flex flex-col items-center shadow-lg ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} rounded-md text-neutral-content p-3 min-w-[75px]`}
          >
            <div className="font-bold text-4xl">{timeLeft.seconds}</div>
            <div className="text-sm">Sec</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CountdownTimer
