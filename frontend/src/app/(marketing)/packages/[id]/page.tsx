import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function PackageDetailsPage({ params }: { params: { id: string } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';
  let pkg = null;
  
  try {
    const res = await fetch(`${API_URL}/packages/${params.id}`, { next: { revalidate: 60 } });
    if (res.ok) {
      pkg = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch package details:', e);
  }

  if (!pkg) {
    notFound();
  }

  // Fallback images if none provided
  const images = pkg.images && pkg.images.length > 0 
    ? pkg.images 
    : [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop'
      ];

  const mainImage = images[0];
  const sideImages = images.slice(1, 3); // Take up to 2 for side

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="text-sm font-medium text-black hover:underline mb-2 inline-block">
            &larr; Back to all packages
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {pkg.name}
          </h1>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600 font-medium">
            <span className="flex items-center">⭐ 4.9 (124 reviews)</span>
            <span>•</span>
            <span>🕒 {pkg.durationMinutes ? `${pkg.durationMinutes / 60} Hours` : 'Flexible Duration'}</span>
            {pkg.isPopular && (
              <>
                <span>•</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold text-xs uppercase">Bestseller</span>
              </>
            )}
          </div>
        </div>

        {/* Media Gallery (Airbnb Style) */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 h-auto md:h-[500px] overflow-hidden rounded-2xl">
          <div className="w-full md:w-2/3 h-64 md:h-full relative group">
            <img src={mainImage} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer" />
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-4 hidden md:flex">
            {sideImages.map((img: string, idx: number) => (
              <div key={idx} className="w-full h-1/2 relative group overflow-hidden">
                <img src={img} alt={`${pkg.name} detail ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer" />
              </div>
            ))}
            {sideImages.length === 0 && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                More images coming soon
              </div>
            )}
          </div>
        </div>

        {/* Content & Sticky Booking Card */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column (Details) */}
          <div className="flex-1 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this package</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {pkg.description}
              </p>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p className="text-gray-700 font-medium">Professional Editing & Retouching</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p className="text-gray-700 font-medium">High-Resolution Digital Delivery</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p className="text-gray-700 font-medium">Private Online Gallery</p>
                </div>
                {pkg.allowExtraHours && (
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p className="text-gray-700 font-medium">Flexible Extra Hours Allowed</p>
                  </div>
                )}
              </div>
            </section>

            {pkg.videoUrl && (
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Video</h2>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                  <iframe 
                    src={pkg.videoUrl} 
                    title="Portfolio Video" 
                    className="w-full h-full" 
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Sticky Booking Card) */}
          <div className="w-full lg:w-96">
            <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
              <div className="flex items-baseline space-x-1 mb-6">
                <span className="text-3xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                <span className="text-gray-500 font-medium">/ total</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Base Package</span>
                  <span className="font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                </div>
                {pkg.allowExtraHours && (
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600 underline decoration-dashed cursor-help" title="If you need more time on the day">Extra Hour Rate</span>
                    <span className="font-bold text-gray-900">₹{pkg.extraHourRate}/hr</span>
                  </div>
                )}
              </div>

              <Link href="/booking" className="block w-full bg-black text-white text-center font-bold text-lg py-4 rounded-xl hover:bg-gray-900 transition transform hover:scale-[1.02] active:scale-95 shadow-md">
                Book This Package
              </Link>
              <p className="text-center text-sm text-gray-500 mt-4">You won&apos;t be charged yet</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
