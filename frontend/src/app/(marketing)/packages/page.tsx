export default function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Starter", price: "₹2,999", duration: "1 Hour" },
          { name: "Standard", price: "₹5,499", duration: "2 Hours", popular: true },
          { name: "Premium", price: "₹9,999", duration: "4 Hours" }
        ].map((pkg) => (
          <div key={pkg.name} className={`bg-white p-8 rounded-lg border shadow-sm relative flex flex-col ${pkg.popular ? 'border-black ring-1 ring-black' : ''}`}>
            {pkg.popular && <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>}
            <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
            <div className="text-4xl font-extrabold text-center mb-6">{pkg.price}</div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center text-gray-600">✓ {pkg.duration} of coverage</li>
              <li className="flex items-center text-gray-600">✓ High-resolution digital files</li>
              <li className="flex items-center text-gray-600">✓ Basic retouching included</li>
            </ul>
            <button className={`w-full py-3 rounded-md font-semibold transition ${pkg.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-black hover:bg-gray-200'}`}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
