export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-gray">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2>1. Introduction</h2>
      <p>Welcome to InstaImage. By accessing our platform, you agree to these terms...</p>
      <h2>2. Booking Policy</h2>
      <p>All bookings are subject to availability and confirmation by the photographer...</p>
      <h2>3. User Conduct</h2>
      <p>Users must behave respectfully towards photographers during all shoots...</p>
    </div>
  );
}
