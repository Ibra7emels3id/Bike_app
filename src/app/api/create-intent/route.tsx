import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.CLERK_SECRET_STRIPE_KEY!, {
  typescript: true,
});
export async function POST(request: any) {
  const data: any = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
    });
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
