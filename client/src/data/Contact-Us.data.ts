// ─── Contact Us Data ──────────────────────────────────────────────────────────
// Sourced from:
//   TermsAndConditions   section 22  — Contact Us (email, company)
//   TermsAndConditions   section 20  — Governing Law & Disputes (location)
//   PrivacyPolicy        section 14  — Contact Us (email, response commitment)
//   PrivacyPolicy        section 1.1 — Information You Provide (form field context)
//   DataProcessingTerms  section 2   — Processing of Personal Data (data usage note)
//   TermsAndConditions   section 3   — Customer Responsibilities (form guidance)

export const contactPageData = {
  // ── Page heading ─────────────────────────────────────────────────────────────
  heading: "Contact Us",
  // Sourced: T&C section 3 — customer responsibilities re: accurate information
  subheading:
    "Send us a message and we'll get back to you. Please provide accurate and complete information so we can respond effectively.",

  // ── Contact detail cards shown beside / above the form ───────────────────────
  // Sourced: T&C section 22 (email), T&C section 20 (location), Privacy section 14
  details: [
    {
      type: "Email",
      value: "legal@techbinaryz.com",
      note: "For general enquiries and project discussions",
    },
    {
      type: "Location",
      value: "Kolkata, West Bengal, India",
      note: "Governing jurisdiction per our Terms & Conditions",
    },
    {
      type: "Response",
      value: "Within applicable timeframes",
      // Sourced: Privacy Policy section 14 closing
      note: "We review and respond to requests in accordance with applicable law",
    },
  ],

  // ── Form fields ───────────────────────────────────────────────────────────────
  // Sourced: Privacy Policy section 1.1 — Information You Provide to Us
  form: {
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "Enter your first name",
        required: true,
        errorMessage: "First name is required",
      },
      lastName: {
        label: "Last Name",
        placeholder: "Enter your last name",
        required: false,
      },
      email: {
        label: "Email Address",
        placeholder: "example@techbinaryz.com",
        required: true,
        errorMessage: "Email is required",
        errorInvalidMessage: "Enter a valid email",
      },
      message: {
        label: "Message",
        placeholder: "Tell us about your project or enquiry",
        required: true,
        errorMessage: "Message is required",
      },
    },
    submitLabel: "Send Message",
    loadingLabel: "Sending...",
    // Sourced: Privacy Policy section 14 — response commitment
    successMessage: "Message sent! We'll review and respond in accordance with applicable law.",
  },

  // ── Data usage note shown below the form ─────────────────────────────────────
  // Sourced: DataProcessingTerms section 2 — Processing of Personal Data
  dataNote:
    "Information submitted through this form will be used to respond to your enquiry, provide technical support, and communicate with you regarding our services. We process your data only as necessary for these purposes.",

  // ── Legal links shown at the bottom ──────────────────────────────────────────
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Data Processing Terms", href: "/data-processing-terms" },
  ],
};
