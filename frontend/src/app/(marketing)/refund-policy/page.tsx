export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-gray">
      <h1>Refund Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2>1. Cancellations</h2>
      <p>If you cancel your booking at least 48 hours in advance, you will receive a full refund.</p>
      <h2>2. Quality Guarantee</h2>
      <p>If you are entirely unsatisfied with the quality of your photos due to technical errors by the photographer, you may request a partial or full refund.</p>
      <h2>3. Processing Time</h2>
      <p>Refunds will be processed within 5-7 business days to your original payment method.</p>
    </div>
  );
}
