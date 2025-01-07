"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { type StoreType } from "../types"


interface StoreCardProps {
  store: StoreType
}

export default function StoreCard({ store }: StoreCardProps) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{store.name}</CardTitle>
        <CardDescription>{store.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{store.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="default" onClick={() => router.push(`/stores/${store.id}`)}>View Store</Button>
      </CardFooter>
    </Card>

  )
}
