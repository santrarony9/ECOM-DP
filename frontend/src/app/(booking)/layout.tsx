import Link from 'next/link';

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            SnapMarket
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">🔒 Secure Checkout</span>
            <span className="hidden sm:flex items-center">⭐ Vetted Pros</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col pt-8">
        <div className="max-w-3xl mx-auto w-full px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
