import Stripe from "stripe";

let _instance: Stripe | undefined;

function getInstance(): Stripe {
  if (_instance) return _instance;
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  _instance = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-04-22.dahlia",
    typescript: true,
  });
  return _instance;
}

// Proxy delays initialization until first use at request time, not build time
export const stripe = new Proxy({} as Stripe, {
  get(_, prop: string | symbol) {
    return (getInstance() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
