import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@Tech Binaryz.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 9am to 6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Tech Street, Digital City, DC 12345",
    description: "Come say hello at our office",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Friday: 9:00 AM - 6:00 PM",
    description: "Weekend support available",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Let's Start a Conversation
        </h2>
        <p className="text-muted-foreground leading-7">
          We're here to help bring your ideas to life. Whether you have a
          specific project in mind or just want to explore possibilities, we'd
          love to hear from you.
        </p>
      </div>

      <div className="space-y-6">
        {contactInfo.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-foreground font-medium mb-1">
                  {item.details}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-muted/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Quick Response Guarantee
        </h3>
        <p className="text-sm text-muted-foreground leading-6">
          We typically respond to all inquiries within 24 hours. For urgent
          matters, don't hesitate to call us directly during business hours.
        </p>
      </div>
    </div>
  );
}
