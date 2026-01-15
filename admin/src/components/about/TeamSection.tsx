import Image from "next/image";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech industry",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=SJ",
    id: 1,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Full-stack architect passionate about scalable solutions",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=MC",
    id: 2,
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Designer",
    bio: "Creative mind focused on user-centered design",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=ER",
    id: 3,
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    bio: "Backend specialist with expertise in cloud architecture",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=DK",
    id: 4,
  },
  {
    name: "Lisa Thompson",
    role: "Project Manager",
    bio: "Agile expert ensuring smooth project delivery",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=LT",
    id: 5,
  },
  {
    name: "Alex Martinez",
    role: "DevOps Engineer",
    bio: "Infrastructure automation and deployment specialist",
    image: "https://placehold.co/300x300/e2e8f0/64748b?text=AM",
    id: 6,
  },
];

export function TeamSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The talented individuals behind our success
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
