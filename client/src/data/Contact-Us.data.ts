import { Mail, Phone, MapPin, Send } from "lucide-react";

export const contactFormData = {
  title: "Contact Us",
  subtitle: "We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.",
  contactDetails: [
    { type: "Email", value: "support@aistarterkit.com", icon: Mail },
    { type: "Phone", value: "+1 (800) 123-4567", icon: Phone },
    { type: "Headquarters", value: "123 Tech Avenue, San Francisco, CA", icon: MapPin },
  ],
  formFields: [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Jane" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
    { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
    { name: "company", label: "Company (Optional)", type: "text", placeholder: "Acme Corp" },
    { name: "message", label: "How can we help you?", type: "textarea", placeholder: "Tell us about your project..." },
  ],
  submitAction: {
    label: "Send Message",
    icon: Send
  }
};
