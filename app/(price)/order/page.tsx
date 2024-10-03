// import stripe from "stripe";

export default async function Success() {
  // const customer = await stripe.customers.retrieve(session.customer);

  return (
    <div>
      <h1>Thanks for your order</h1>
      <p>
        We appreciate your business! If you have any questions, please email
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
    </div>
  );
}
