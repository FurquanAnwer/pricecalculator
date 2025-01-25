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
      const price = subscriptionPricing ? parseFloat(subscriptionPricing.details.split(",")[0].replace(/[^0-9]/g, "")) : 0;
      return total + price;
    }, 0);
  };

  return (
    <div className="h-screen bg-white grid grid-cols-12 p-5 gap-4">
      {/* Left Panel */}
      <div className="col-span-6 bg-gray-100 rounded-lg p-4 overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">Available Tools</h2>
        {tools.length > 0 ? (
          tools.map((tool, index) => (
            <div
              key={index}
              className={`mb-4 border p-3 rounded shadow cursor-pointer ${
                selectedTools.some((t) => t.name === tool.name)
                  ? "bg-blue-200"
                  : ""
              }`}
              onClick={() => handleSelectTool(tool)}
            >
              <p className="font-bold">{tool.name}</p>
              <p>Company: {tool.company}</p>
              <p>Version: {tool.version}</p>
              <p>Type: {tool.type}</p>
              <p>Variant: {tool.variant}</p>
            </div>
          ))
        ) : (
          <p>No tools available.</p>
        )}
      </div>

      {/* Right Panel */}
      <div className="col-span-6 bg-gray-200 rounded-lg p-4">
        <h2 className="font-bold text-xl mb-4">Selected Tools</h2>
        {selectedTools.length > 0 ? (
          <div>
            {selectedTools.map((tool, index) => (
              <div key={index} className="mb-4 border p-3 rounded shadow">
                <p className="font-bold">Name: {tool.name}</p>
                <p>Company: {tool.company}</p>
                <p>Pricing:</p>
                <ul className="list-disc pl-5">
                  {tool.pricingMechanisms.map((pricing, idx) => (
                    <li key={idx}>
                      <strong>{pricing.type}:</strong> {pricing.details}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-4 p-4 bg-white rounded shadow">
              <h3 className="font-bold text-lg">Total Estimated Cost</h3>
              <p className="text-xl font-semibold">${calculateTotalCost()}</p>
            </div>
          </div>
        ) : (
          <p>No tools selected yet.</p>
        )}
      </div>
    </div>
  );
}

export default PublicPricingTool;
