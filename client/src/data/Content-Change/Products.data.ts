import { BookOpen, Briefcase, Calendar, Users } from "lucide-react";

export const productsData = {
    heading: "What We've Built",
    subheading:
        "From our own flagship platforms to solutions delivered for real clients — here's a look at what TechBinaryz ships.",
    products: [
        {
            id: "writto",
            name: "Writto",
            tagline: "Blog Writing Platform with Discussion Rooms",
            description:
                "A full-featured blogging platform where writers publish long-form content and engage readers through live discussion rooms. Built for communities that want more than just comments.",
            type: "Own Product",
            icon: BookOpen,
            tags: ["Platform", "Blogging", "Community", "Real-time"],
            highlighted: true,
        },
        {
            id: "cctp-wb-job",
            name: "CCTP-WB-Job",
            tagline: "Official Website & Admin Panel",
            description:
                "End-to-end web solution for CCTP-WB — a public-facing job portal paired with a full admin panel for managing listings, applications, and user data.",
            type: "Client Project",
            icon: Briefcase,
            tags: ["Web App", "Admin Panel", "Job Portal", "Government"],
            highlighted: false,
        },
        {
            id: "hrms",
            name: "HRMS",
            tagline: "Human Resource Management System",
            description:
                "Internal HR management system covering employee records, attendance, leave management, and organisational workflows — built for operational efficiency.",
            type: "Internal Tool",
            icon: Users,
            tags: ["HR", "Internal", "Management", "Workflows"],
            highlighted: false,
        },
        {
            id: "sptm",
            name: "SPTM",
            tagline: "Scheduler Package Time Manager",
            description:
                "A scheduling and time management tool built to organise, track, and optimise package delivery timelines and resource allocation.",
            type: "Own Product",
            icon: Calendar,
            tags: ["Scheduling", "Time Management", "Logistics"],
            highlighted: false,
        },
    ],
};


export const feedbackData = {
    title: "What Our Customers Say",
    reviews: [
        {
            name: "Alex Johnson",
            role: "CTO at StartupX",
            content: "This starter kit saved us literally months of development time. The abstractions are perfect.",
            rating: 5,
        },
        {
            name: "Maria Garcia",
            role: "Freelance Developer",
            content: "I use this as the base for all my client projects now. It's incredibly robust and well documented.",
            rating: 5,
        },
        {
            name: "Sam Lee",
            role: "Product Manager",
            content: "Even as a non-engineer, the visual builder allowed me to prototype our core AI feature in an afternoon.",
            rating: 4,
        }
    ]
};