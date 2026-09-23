export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
      return new Response("Webhook not configured", { status: 500 });
    }

    const body = await request.text();
    const event = await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET);
    if (!event) {
      return new Response("Invalid signature", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        // Payment is verified by Stripe. Access provisioning will be added
        // once the NOWYES access store is configured.
        console.log("NOWYES payment verified", session.id);
      }
    }

    return new Response("ok");
  }
};

async function verifyStripeSignature(payload, header, secret) {
  const parts = Object.fromEntries(
    header.split(",").map(part => {
      const [key, value] = part.split("=");
      return [key, value];
    })
  );
  const timestamp = parts.t;
  const signatures = header.split(",")
    .filter(p => p.startsWith("v1="))
    .map(p => p.slice(3));
  if (!timestamp || !signatures.length) return null;

  const signedPayload = timestamp + "." + payload;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const mac = new Uint8Array(await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(signedPayload)
  ));
  const expected = [...mac].map(b => b.toString(16).padStart(2, "0")).join("");
  return signatures.some(sig => timingSafeEqual(sig, expected)) ? JSON.parse(payload) : null;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
