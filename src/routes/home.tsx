import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { LucideBriefcase, LucidePlayCircle, LucideBarChart3, LucideLineChart } from "lucide-react";


const HomePage = () => {
  const testimonials = [
    {
      name: "Yogesh Arora",
      title: "R2R Executive @EXL",
      quote:
        "This platform helped me land my dream role in just 3 weeks! The AI feedback was eerily accurate and super helpful.",
      avatar: "assets/avatar/yogesh.jpeg", // Replace with actual image path
    },
    {
      name: "Sarvesh Kumar Roy",
      title: "Data Science Intern @ Slash Mark IT Solutions",
      quote:
        "The mock interviews felt real. I walked into my actual interview more confident than ever — and nailed it.",
      avatar: "assets/avatar/sarvesh.jpeg",
    },
    {
      name: "Gaurisha Maddaan",
      title: "Software Developer @ Lagazon Technologies",
      quote:
        "I loved the instant feedback and progress tracking. It turned my interview anxiety into excitement.",
      avatar: "assets/avatar/gaurisha.jpeg",
    },
  ];

  const steps = [
    {
      title: "Choose Your Role",
      description: "Select your job title or industry to tailor questions to your goals.",
      icon: <LucideBriefcase className="h-8 w-8 text-primary" />,
    },
    {
      title: "Start AI-Led Interview",
      description: "Jump into a simulated interview powered by AI.",
      icon: <LucidePlayCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Get Instant Feedback",
      description: "Receive real-time insights and analysis on your performance.",
      icon: <LucideBarChart3 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvement over time and focus on key skills.",
      icon: <LucideLineChart className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="flex-col w-full pb-24">
      <Container>
      <section className="my-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center md:text-left leading-tight">
            Ace Your Next Interview with{" "}
            <span className="text-primary">AI-Powered Mock Sessions</span>
          </h2>

          <p className="mt-4 text-muted-foreground text-sm md:text-base text-center md:text-left">
            Practice real interview scenarios, get instant feedback, and improve your confidence – anytime, anywhere.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Button className="w-full sm:w-auto">Start Mock Interview</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Sign Up Free
            </Button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <img
            src="/assets/img/AI.jpg" // <- Replace with your image path
            alt="AI Interview Assistance"
            className="w-full max-w-xl md:max-w-2xl rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
    <section className="my-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">📈 Success Stories</h2>
        <p className="text-muted-foreground mb-10 text-sm md:text-base">
          Hear from users who boosted their interview performance and got hired.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="h-full flex flex-col justify-between p-6 text-left">
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm italic">
                  “{testimonial.quote}”
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="my-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">🧰 How It Works</h2>
        <p className="text-muted-foreground mb-10 text-sm md:text-base">
          Follow these simple steps to get started and grow your interview skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <CardContent className="text-sm text-muted-foreground mt-2">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
      </Container>
    </div>
  )
}

export default HomePage