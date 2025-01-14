'use client'

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useStripeCheckout } from "../api/use-stripe-checkout";

interface StripeCheckoutProps {
  ids: string[];
}

export default function StripeCheckout({ ids }: StripeCheckoutProps) {
  const router = useRouter();
  const { mutate, isPending } = useStripeCheckout();

  function handleCheckout() {
    mutate({ json: { ids } }, {
      onSuccess: () => {
        router.push('/order');
      }
    });
  }

  return (
    <Button className="w-full mt-4" onClick={handleCheckout} disabled={isPending}>
      {isPending ? 'Checking out...' : 'Checkout'}
    </Button>
  )
};

