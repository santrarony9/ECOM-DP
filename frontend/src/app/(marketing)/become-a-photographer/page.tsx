export default function BecomePhotographerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Join InstaImage as a Pro</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Grow your photography business, reach more clients, and manage your bookings effortlessly with InstaImage.</p>
      <div className="bg-white p-8 md:p-12 border rounded-xl shadow-sm max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-bold mb-6 text-center">Apply Now</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Jane" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border rounded-md p-2" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Portfolio Link</label>
            <input type="url" className="w-full border rounded-md p-2" placeholder="https://..." />
          </div>
          <button type="button" className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition mt-6">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
