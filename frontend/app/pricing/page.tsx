
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const plans = [
    {
      name: "Standard",
      price: "₹0",
      period: "/month",
      description: "Perfect for casual learners.",
      features: ["3 Exam Predictions", "Basic OCR", "Community Support"],
      cta: "Start Learning",
      popular: false,
    },
    {
      name: "Scholar",
      price: "₹199",
      period: "/month",
      description: "For serious students aiming for top ranks.",
      features: [
        "Unlimited Predictions",
        "Visual Cortex AI (Handwritten Notes)",
        "The Oracle Engine (GraphRAG)",
        "Download Editable LaTeX",
      ],
      cta: "Get Predicted",
      popular: true,
    },
    {
      name: "Industrial",
      price: "₹49,999",
      period: "/year",
      description: "For Departments & Institutes.",
      features: [
        "Admin Dashboard",
        "Department-wide Knowledge Graph",
        "Curriculum Analytics",
        "Placement Probability Score",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Invest in Your Grades
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Simple, transparent pricing adjusted for students in India.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg shadow-sm divide-y divide-gray-700 bg-gray-800 flex flex-col ${
                plan.popular ? "border-emerald-500 ring-2 ring-emerald-500 relative" : "border-gray-700"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-0.5 text-sm font-semibold rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-300">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-base font-medium text-gray-400">{plan.period}</span>
                </p>
                <Button className={`mt-8 w-full ${plan.popular ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-700 hover:bg-gray-600"}`}>
                   {plan.cta}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-white tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-emerald-500" aria-hidden="true" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
