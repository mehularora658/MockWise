import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-3xl shadow-md border">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center">About MockWise</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            MockWise is an AI-powered mock interview platform designed to help job seekers 
            prepare confidently and effectively. Whether you're targeting tech roles, behavioral interviews, 
            or system design sessions, our smart AI simulates real-world scenarios to sharpen your skills.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Built with the latest in AI and web technologies, MockWise offers personalized feedback, 
            real-time analysis, and question sets tailored to your goals.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We’re committed to making your interview preparation smart, efficient, and anxiety-free.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
