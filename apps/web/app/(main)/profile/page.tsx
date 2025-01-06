'use client'

import PageLoader from "@/components/page-loader";
import { useGetProfile } from "@/features/auth/api/use-get-profile";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfile();

  if (isLoading) return <PageLoader />

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
