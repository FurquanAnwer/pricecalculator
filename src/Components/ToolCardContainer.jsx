import Loading from "./Loading"

function ToolCardContainer({ companies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2 md:px-4 py-4 md:py-6">
      {companies.length > 0 ? (
        companies.map((tool, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-white to-gray-50 shadow-md rounded-2xl p-4 md:p-6 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">{tool.name}</h3>
            <div className="text-sm md:text-base text-gray-600 mb-3">
              <p className="mb-1">
                <span className="font-medium text-gray-700">Version:</span> {tool.version}
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-700">Type:</span> {tool.type}
              </p>
              <p>
                <span className="font-medium text-gray-700">Variant:</span> {tool.variant}
              </p>
            </div>
            <div className="mt-3 md:mt-4">
              <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-2">Pricing Mechanisms:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-600">
                {tool.pricingMechanisms.map((pricing, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-gray-700">{pricing.type}:</span> {pricing.details}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700 text-center col-span-full">
          <Loading />
        </p>
      )}
    </div>
  )
}

export default ToolCardContainer

