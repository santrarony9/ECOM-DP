export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-gray">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create or modify your account...</p>
      <h2>2. Use of Information</h2>
      <p>We may use information about you to provide, maintain, and improve our services...</p>
      <h2>3. Sharing of Information</h2>
      <p>We will not share your personal information with third parties without your consent...</p>
    </div>
  );
}
