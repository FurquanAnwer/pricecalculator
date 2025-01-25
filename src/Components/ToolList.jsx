import { useState, useEffect } from "react";

const ToolList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        const techCorp = data.find((item) => item.company === "TechCorp");
        setCompanies(techCorp ? techCorp.tools : []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Available Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length > 0 ? (
          companies.map((tool, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Version:</span> {tool.version}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Type:</span> {tool.type}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Variant:</span> {tool.variant}
              </p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Pricing Mechanisms:
                </h4>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  {tool.pricingMechanisms.map((pricing, idx) => (
                    <li key={idx}>
                      <strong>{pricing.type}:</strong> {pricing.details}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">
            No tools available for TechCorp.
          </p>
        )}
      </div>
    </div>
  );
};

export default ToolList;
