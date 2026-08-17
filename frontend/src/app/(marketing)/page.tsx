import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Need a Photographer in Kolkata?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book professional photographers instantly for your next event, wedding, or personal shoot. Transparent pricing and guaranteed quality.
          </p>
          <Link href="/booking" className="inline-block bg-black text-white text-lg px-8 py-4 rounded-md font-semibold hover:bg-gray-800 transition">
            BOOK A PHOTOGRAPHER
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">⏱️</span>
              <span className="text-sm font-bold text-gray-900">Fixed Duration</span>
              <span className="text-xs text-gray-500 mt-1">Know exactly what you get</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">💰</span>
              <span className="text-sm font-bold text-gray-900">Transparent Pricing</span>
              <span className="text-xs text-gray-500 mt-1">No hidden fees or surprises</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">📸</span>
              <span className="text-sm font-bold text-gray-900">Vetted Pros</span>
              <span className="text-xs text-gray-500 mt-1">Only the best local talent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center text-center">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                  Image Placeholder
                </div>
                <h3 className="text-xl font-bold mb-2">Package {i}</h3>
                <p className="text-gray-600 mb-4">A great package for your photography needs.</p>
                <button className="mt-auto w-full border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              "1. Choose Shoot",
              "2. Pick Package",
              "3. Select Time",
              "4. Book Pro",
              "5. Enjoy Shoot",
              "6. Get Photos",
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {idx + 1}
                </div>
                <p className="font-medium text-sm text-gray-700">{step.split('. ')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
