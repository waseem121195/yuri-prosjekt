import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !signature) {
    return NextResponse.json(
      { error: "Missing webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = {
      id: session.id,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency,
      customerEmail: session.customer_email,
      status: session.payment_status,
      createdAt: new Date().toISOString(),
      metadata: session.metadata,
    };

    console.log("Ordre fullfort:", order);

    // Log to file (no database in prototype)
    try {
      const ordersDir = path.join(process.cwd(), ".orders");
      await fs.mkdir(ordersDir, { recursive: true });
      await fs.writeFile(
        path.join(ordersDir, `${session.id}.json`),
        JSON.stringify(order, null, 2)
      );
    } catch (fileErr) {
      console.warn("Could not write order file:", fileErr);
    }
  }

  return NextResponse.json({ received: true });
}
