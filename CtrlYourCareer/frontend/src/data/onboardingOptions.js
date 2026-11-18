import {
  GraduationCap,
  BriefcaseBusiness,
  TrendingUp,
  Compass,
  BookOpen,
  Users,
  Target,
  BarChart3,
} from "lucide-react";

export const roles = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Student",
    desc: "I’m exploring my future and building new skills.",
  },
  {
    id: "job-seeker",
    icon: BriefcaseBusiness,
    title: "Job seeker",
    desc: "I’m preparing to apply for jobs and interviews.",
  },
  {
    id: "professional",
    icon: TrendingUp,
    title: "Working professional",
    desc: "I want to grow or change my career.",
  },
  {
    id: "other",
    icon: Compass,
    title: "Just exploring",
    desc: "I’m figuring out my next move.",
  },
];
export const goals = [
  {
    id: "learning",
    icon: BookOpen,
    title: "Learn new skills",
    desc: "Discover resources and follow a learning path.",
  },
  {
    id: "interviews",
    icon: Users,
    title: "Prepare for interviews",
    desc: "Build confidence and assess your readiness.",
  },
  {
    id: "career",
    icon: Target,
    title: "Find my career direction",
    desc: "Explore roles that fit my interests.",
  },
  {
    id: "gaps",
    icon: BarChart3,
    title: "Understand my skill gaps",
    desc: "See what to improve for my next step.",
  },
];
export const interests = [
  "Software development",
  "Data & analytics",
  "Design & creativity",
  "Business & finance",
  "Marketing",
  "Cybersecurity",
  "Healthcare",
  "Engineering",
  "Product management",
  "Education",
];
