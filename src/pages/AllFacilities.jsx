const AllFacilities = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Facilities
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-center text-gray-500 col-span-3">Loading facilities...</p>
      </div>
    </div>
  )
}

export default AllFacilities