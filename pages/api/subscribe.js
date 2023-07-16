import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(400);
  const { name, email, amount, paymentMethod } = req.body;
  try {
    const customer = await stripe.customers.create({
      name,
      email,
      payment_method: paymentMethod,
      invoice_settings:{ default_payment_method: paymentMethod}
    });
    
    const product = await stripe.products.create({
      name: "Monthly Donation",
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "CAD",
            product: product.id,
            unit_amount: amount * 100,
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ['latest_invoice.payment_intent'],
    });
    
    return res.json({
      message: "subscription active",
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    return res.send(err);
  }
}