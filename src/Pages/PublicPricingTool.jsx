import { useEffect, useState } from "react";

function PublicPricingTool() {
  const [tools, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        const allTools = data.flatMap((company) =>
          company.tools.map((tool) => ({ ...tool, company: company.company }))
        );
        setTools(allTools);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectTool = (tool) => {
    if (selectedTools.some((t) => t.name === tool.name)) {
      setSelectedTools(selectedTools.filter((t) => t.name !== tool.name));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const calculateTotalCost = () => {
    return selectedTools.reduce((total, tool) => {
      const subscriptionPricing = tool.pricingMechanisms.find(
        (pricing) => pricing.type === "Subscription"
      );
      const price = subscriptionPricing
        ? parseFloat(
            subscriptionPricing.details.split(",")[0].replace(/[^0-9]/g, "")
          )
        : 0;
      return total + price;
    }, 0);
  };

  return (
    <div className="h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-semibold text-2xl text-gray-800 mb-6">
            Available Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-scroll max-h-[80vh] m-1">
            {tools.length > 0 ? (
              tools.map((tool, index) => (
                <div
                  key={index}
                  className={`border p-6 rounded-lg shadow-md transition-all m-2 ${
                    selectedTools.some((t) => t.name === tool.name)
                      ? "bg-blue-100 border-blue-500"
                      : "hover:shadow-lg"
                  } cursor-pointer`}
                  onClick={() => handleSelectTool(tool)}
                >
                  <p className="font-bold text-lg text-gray-900">
                    {tool.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Company: <span className="font-medium">{tool.company}</span>
                  </p>
                  <p className="text-sm text-gray-600">Version: {tool.version}</p>
                  <p className="text-sm text-gray-600">Type: {tool.type}</p>
                  <p className="text-sm text-gray-600">Variant: {tool.variant}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tools available.</p>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">
              Selected Tools
            </h2>
            {selectedTools.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Company</th>
                      <th className="border p-2 text-left">Pricing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTools.map((tool, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="border p-2">{tool.name}</td>
                        <td className="border p-2">{tool.company}</td>
                        <td className="border p-2">
                          <ul className="list-disc pl-5">
                            {tool.pricingMechanisms.map((pricing, idx) => (
                              <li key={idx}>
                                <strong>{pricing.type}:</strong> {pricing.details}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No tools selected yet.</p>
            )}
          </div>
          <div className="mt-6 p-4 bg-gray-50 border-t rounded-lg">
            <h3 className="font-bold text-lg text-gray-700">
              Total Estimated Cost
            </h3>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              ${calculateTotalCost()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPricingTool;