import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Award,
  Zap,
  Shield,
  Coffee,
  Briefcase,
  GraduationCap,
  DollarSign,
  Calendar,
} from "lucide-react"

const jobOpenings = [
  {
    id: 1,
    title: "Senior Laundry Operations Manager",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "5+ years",
    salary: "₦300,000 - ₦450,000",
    description: "Lead our laundry operations team and ensure exceptional service delivery across all locations.",
    requirements: [
      "Bachelor's degree in Operations Management or related field",
      "5+ years in operations management",
      "Experience in service industry",
      "Strong leadership skills",
    ],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Customer Experience Specialist",
    department: "Customer Service",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    experience: "2-3 years",
    salary: "₦150,000 - ₦220,000",
    description:
      "Ensure our customers receive world-class service and support throughout their journey with LaundriLab.",
    requirements: [
      "Bachelor's degree preferred",
      "2+ years in customer service",
      "Excellent communication skills",
      "Problem-solving mindset",
    ],
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Delivery Driver",
    department: "Logistics",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    experience: "1+ years",
    salary: "₦80,000 - ₦120,000",
    description: "Join our delivery team and help bring clean clothes directly to our customers' doorsteps.",
    requirements: [
      "Valid driver's license",
      "1+ years driving experience",
      "Knowledge of local area",
      "Reliable and punctual",
    ],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "3-4 years",
    salary: "₦200,000 - ₦300,000",
    description: "Drive our digital marketing efforts and help grow our online presence across Nigeria.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "3+ years in digital marketing",
      "Experience with social media and SEO",
      "Creative thinking",
    ],
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Quality Control Inspector",
    department: "Quality Assurance",
    location: "Kano, Nigeria",
    type: "Full-time",
    experience: "2+ years",
    salary: "₦120,000 - ₦180,000",
    description: "Ensure all garments meet our high-quality standards before delivery to customers.",
    requirements: [
      "High school diploma or equivalent",
      "2+ years in quality control",
      "Attention to detail",
      "Knowledge of fabric care",
    ],
    posted: "1 week ago",
  },
  {
    id: 6,
    title: "Software Developer (Frontend)",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "₦400,000 - ₦600,000",
    description: "Help build and maintain our customer-facing applications and internal tools.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years React/Next.js experience",
      "Strong JavaScript skills",
      "Experience with modern web technologies",
    ],
    posted: "4 days ago",
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Continuous learning opportunities, training programs, and career advancement paths.",
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Attractive salary packages with performance bonuses and annual reviews.",
  },
  {
    icon: Calendar,
    title: "Work-Life Balance",
    description: "Flexible working hours, paid time off, and family-friendly policies.",
  },
  {
    icon: Coffee,
    title: "Great Work Environment",
    description: "Modern offices, free meals, and a collaborative team culture.",
  },
  {
    icon: Award,
    title: "Recognition Programs",
    description: "Employee of the month awards, achievement recognition, and team celebrations.",
  },
]

const companyValues = [
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly seek new ways to improve our services and customer experience.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our customers trust us with their garments, and we never take that lightly.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "We believe in the power of collaboration and supporting each other.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make is centered around delivering value to our customers.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dt3czltxx/image/upload/v1748611428/laundrifica_images/careers/modern-office_xqdwkx.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LaundriLab
              </span>{" "}
              Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help us revolutionize the laundry industry in Nigeria. Build your career with a company that values
              innovation, quality, and putting customers first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Briefcase className="mr-2 h-5 w-5" />
                View Open Positions
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Work With Us?</h2>
            <p className="text-lg text-muted-foreground">
              At LaundriLab, we're not just cleaning clothes – we're building the future of laundry services in Nigeria.
              Join a team that's passionate about excellence, innovation, and making a real difference in people's
              lives.
            </p>
          </div>

          {/* Company Values */} 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12">Employee Benefits & Perks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Current Job Openings</h2>
            <p className="text-lg text-muted-foreground">
              Discover exciting career opportunities across different departments and locations. Find the perfect role
              that matches your skills and aspirations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.experience}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline">View Details</Button>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{job.description}</CardDescription>
                  <div>
                    <h4 className="font-semibold mb-2">Key Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a role that fits? We're always looking for talented individuals.
            </p>
            <Button variant="outline" size="lg">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of talented professionals who are already making a difference at LaundriLab. Your next career
              adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Browse All Jobs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                Contact HR Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
