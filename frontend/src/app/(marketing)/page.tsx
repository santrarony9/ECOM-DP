import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';
  let packages = [];
  
  try {
    const res = await fetch(`${API_URL}/packages`, { next: { revalidate: 60 } });
    if (res.ok) {
      packages = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch packages:', e);
  }

  const categories = [
    { name: "Wedding", emoji: "💍" },
    { name: "Pre-Wedding", emoji: "❤️" },
    { name: "Birthday", emoji: "🎂" },
    { name: "Corporate", emoji: "🏢" },
    { name: "Maternity", emoji: "🤰" },
    { name: "Baby Shower", emoji: "👶" },
    { name: "Product", emoji: "📸" },
    { name: "Drone", emoji: "🚁" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Banner Section (Like Instamart/Blinkit Top Carousel) */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white space-y-4 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Professional Photography, <br/><span className="text-blue-200">On-Demand.</span>
            </h1>
            <p className="text-blue-50 text-lg font-medium">
              Book vetted professional photographers instantly. Transparent pricing, guaranteed quality.
            </p>
          </div>
          <div className="hidden md:flex flex-row space-x-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white border border-white/20">
              <div className="text-3xl font-black mb-1">100%</div>
              <div className="text-sm font-medium text-blue-100">Verified Pros</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white border border-white/20">
              <div className="text-3xl font-black mb-1">0</div>
              <div className="text-sm font-medium text-blue-100">Hidden Fees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid (The "Aisles") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Occasion</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <Link href={`/services`} key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-200 transition transform hover:-translate-y-1 cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <span className="text-xs md:text-sm font-semibold text-gray-700 leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Add Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bestselling Packages</h2>
            <p className="text-sm text-gray-500 mt-1">Book instantly for your upcoming event</p>
          </div>
          <Link href="/packages" className="text-blue-600 text-sm font-bold hover:underline">See All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.length === 0 ? (
            <div className="col-span-full text-gray-500 py-8 text-center bg-white rounded-2xl border border-gray-100">No packages available at the moment.</div>
          ) : (
            packages.map((pkg: any) => (
              <div key={pkg._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col relative group cursor-pointer">
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-[10px] uppercase font-bold px-2 py-1 rounded-md z-10 shadow-sm">
                    Bestseller
                  </div>
                )}
                
                {/* Product Image */}
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl mb-4 overflow-hidden relative group-hover:opacity-90 transition">
                  {pkg.images && pkg.images.length > 0 ? (
                    <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">📷</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center text-xs text-gray-500 mb-2 font-medium bg-gray-50 w-max px-2 py-1 rounded-md border border-gray-100">
                    🕒 {pkg.durationMinutes ? `${pkg.durationMinutes / 60} Hours` : "Flexible"}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{pkg.description}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <Link href={`/packages/${pkg._id}`} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm">
                    View &rarr;
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
               🛡️
            </div>
            <div>
              <h3 className="font-bold text-gray-900">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-gray-500">Not happy with the photos? We'll re-shoot it for free.</p>
            </div>
          </div>
          <Link href="/terms" className="text-sm font-bold text-gray-500 hover:text-blue-600 underline">Read our policy</Link>
        </div>
      </div>

    </div>
  );
}
