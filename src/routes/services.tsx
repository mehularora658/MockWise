import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Services() {
  const services = [
    {
      title: "AI Mock Interviews",
      description: "Practice interviews tailored to your role with real-time AI feedback and scoring.",
    },
    {
      title: "Behavioral Interview Training",
      description: "Master STAR-based responses to common HR and leadership questions.",
    },
    {
      title: "Technical & Coding Challenges",
      description: "Solve real coding problems and get instant insights into your logic and efficiency.",
    },
    {
      title: "Custom Question Sets",
      description: "Train with role-specific questions (Frontend, Backend, Data Science, etc.).",
    },
    {
      title: "Interview Analytics",
      description: "Track progress, identify weaknesses, and improve over time using analytics.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {services.map((service, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow border">
            <CardContent className="p-6 space-y-2">
              <Badge variant="outline" className="text-sm">{service.title}</Badge>
              <p className="text-gray-700">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
