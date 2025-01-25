import React, { useState } from "react";

const CreateTool = () => {
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    type: "",
    variant: "",
    pricingMechanisms: [
      { type: "Subscription", details: "" },
      { type: "Pay-as-you-go", details: "" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...formData.pricingMechanisms];
    updatedPricing[index][field] = value;
    setFormData((prev) => ({ ...prev, pricingMechanisms: updatedPricing }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Create a New Tool</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Tool Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter tool name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="version"
          >
            Version
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter version (e.g., 1.2.0)"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter tool type (e.g., Analytics)"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="variant"
          >
            Variant
          </label>
          <input
            type="text"
            id="variant"
            name="variant"
            value={formData.variant}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter variant (e.g., Cloud)"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Pricing Mechanisms
          </h3>
          {formData.pricingMechanisms.map((pricing, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor={`pricing-type-${index}`}
              >
                {pricing.type}
              </label>
              <input
                type="text"
                id={`pricing-type-${index}`}
                value={pricing.details}
                onChange={(e) =>
                  handlePricingChange(index, "details", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={`Enter details for ${pricing.type}`}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Create Tool
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTool;
