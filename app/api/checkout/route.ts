import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/lib/types";
import type Stripe from "stripe";

// LineItem type derived from the create params to avoid namespace resolution issues in Stripe 22
type StripeLineItem = NonNullable<
  Stripe.Checkout.SessionCreateParams["line_items"]
>[number];

export async function POST(req: NextRequest) {
  try {
    const { items, discountCode, discountAmount, shippingCost } =
      (await req.json()) as {
        items: CartItem[];
        discountCode?: string;
        discountAmount?: number;
        shippingCost: number;
      };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Handlekurven er tom" },
        { status: 400 }
      );
    }

    const lineItems: StripeLineItem[] = items.map((item) => ({
      price_data: {
        currency: "nok",
        product_data: {
          name: item.productName,
          description: item.displayLabel,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses øre (cents)
      },
      quantity: item.qty,
    }));

    // Add shipping as a line item
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "nok",
          product_data: { name: "Frakt" },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // Add discount as a negative line item
    if (discountAmount && discountAmount > 0) {
      lineItems.push({
        price_data: {
          currency: "nok",
          product_data: { name: `Rabatt (${discountCode})` },
          unit_amount: -Math.round(discountAmount * 100),
        },
        quantity: 1,
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      locale: "nb",
      success_url: `${siteUrl}/kvittering?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/handlekurv`,
      metadata: {
        discountCode: discountCode || "",
      },
    });

    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betalingsøkt" },
      { status: 500 }
    );
  }
}
