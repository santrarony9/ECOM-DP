export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {["Wedding Photography", "Event Photography", "Portrait Sessions", "Commercial Shoots", "Real Estate", "Product Photography"].map((service) => (
          <div key={service} className="bg-white p-6 rounded-lg border shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-2xl">📸</div>
            <h3 className="text-xl font-semibold mb-2">{service}</h3>
            <p className="text-gray-600 mb-4">Professional {service.toLowerCase()} tailored to your needs.</p>
            <button className="mt-auto text-black border border-black px-4 py-2 rounded hover:bg-gray-50 transition">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
