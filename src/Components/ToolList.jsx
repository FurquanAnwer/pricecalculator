import { useState, useEffect } from "react"
import Loading from "./Loading"
import ToolCardContainer from "./ToolCardContainer"

const ToolList = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the data")
        }
        return response.json()
      })
      .then((data) => {
        const techCorp = data.find((item) => item.company === "TechCorp")
        setCompanies(techCorp ? techCorp.tools : [])
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Available Tools</h2>
      <ToolCardContainer companies={companies} />
    </div>
  )
}

export default ToolList

