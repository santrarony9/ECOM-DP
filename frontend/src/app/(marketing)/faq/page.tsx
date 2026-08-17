export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {[
          { q: "How do I book a photographer?", a: "You can book directly through our website by selecting your desired service, package, and date." },
          { q: "When will I receive my photos?", a: "Digital photos are typically delivered within 48-72 hours after the shoot." },
          { q: "Can I reschedule my shoot?", a: "Yes, you can reschedule up to 24 hours before the shoot without any penalty." }
        ].map((item, i) => (
          <div key={i} className="border-b pb-6">
            <h3 className="text-xl font-bold mb-2">{item.q}</h3>
            <p className="text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
