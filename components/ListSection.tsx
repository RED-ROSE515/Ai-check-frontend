import React, { useTransition } from "react"
import { Card, CardBody, Image, Button } from "@heroui/react"
import collegeImage from "@/public/NerdBunnyUI/college.png"
import phdImage from "@/public/NerdBunnyUI/PhD.png"
import { ShineBorder } from "./ui/shine-border"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Loader from "./Loader"
const ListSection = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const [
    discrepanciesNavigationPending,
    startDiscrepanciesNavigationTransition,
  ] = useTransition()
  const [articlesNavigationPending, startArticlesNavigationTransition] =
    useTransition()
  return (
    <div className="flex flex-col gap-[36px] mt-15">
      <h1 className="text-md md:text-3xl text-center font-semibold md:font-bold">
        See How NerdBunny is Improving Research Integrity
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-4 mt-6">
        <Card
          isHoverable
          isPressable
          className={`${theme === "dark" ? "bg-[#081524] hover:bg-[#081524]" : "bg-white hover:bg-gray-100"}`}
          onPress={() => {
            startDiscrepanciesNavigationTransition(() => {
              router.push(
                `${process.env.NEXT_PUBLIC_DOMAIN}/results/discrepancies`
              )
            })
          }}
        >
          <ShineBorder
            borderWidth={2}
            shineColor={["#303CFE", "#2563EB", "#505CFF"]}
          />
          <CardBody className="flex flex-col p-4">
            {discrepanciesNavigationPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-4">
                  <Image
                    src={collegeImage.src}
                    alt="Scientific Error Detection"
                    width={48}
                    height={48}
                  />
                  <span className="uppercase text-sm font-bold text-muted-foreground">
                    Discrepancies
                  </span>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Scientific Error Detection
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI agent detects errors in research papers, making complex
                  studies easier to understand.
                  <br />
                  <br />
                  So many papers analyzed
                </p>
                <Button size="sm" className="w-fit" variant="shadow">
                  View Analyzed Papers
                </Button>
              </>
            )}
          </CardBody>
        </Card>

        <Card
          isHoverable
          isPressable
          className={`${theme === "dark" ? "bg-[#0F1441] hover:bg-[#0F1441]" : "bg-white hover:bg-gray-100"}`}
          onPress={() => {
            startArticlesNavigationTransition(() => {
              router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/results/articles`)
            })
          }}
        >
          <ShineBorder
            borderWidth={2}
            shineColor={["#381796", "#37149B", "#23145F"]}
          />
          <CardBody className="flex flex-col p-4">
            {articlesNavigationPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-4">
                  <Image
                    src={phdImage.src}
                    alt="JFK Records Analysis"
                    width={48}
                    height={48}
                  />
                  <span className="uppercase text-sm font-bold text-muted-foreground">
                    Articles
                  </span>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Academic Summaries and Articles
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI agent creates summaries and articles from academic
                  papers, making complex research accessible to everyone.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  80,000+ documents indexed
                </p>
                <Button size="sm" className="w-fit" variant="shadow">
                  View Created Summaries and Articles
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ListSection
