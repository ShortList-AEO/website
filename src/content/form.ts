/** Audit request form copy. Validation rules live in the zod schema (Phase 4); messages live here. */
export const auditForm = {
  categories: ["Skincare", "Haircare", "Makeup", "Body care", "Men's grooming", "Other"],
  fields: {
    brand: { label: "Brand name", placeholder: "Your brand" },
    website: { label: "Website", placeholder: "yourbrand.in" },
    category: { label: "Category", placeholder: "Choose a category" },
    founder: { label: "Your name", placeholder: "" },
    email: { label: "Work email", placeholder: "you@yourbrand.in" },
    whatsapp: { label: "WhatsApp number", hint: "Optional", placeholder: "+91" },
  },
  submit: "Get your free AI audit",
  submitting: "Sending",
  errors: {
    brand: "Enter your brand name.",
    website: "Enter your website, like yourbrand.in.",
    category: "Choose your category.",
    founder: "Enter your name.",
    email: "Enter a work email, like you@yourbrand.in.",
    whatsapp: "Enter a phone number with country code, like +91 98765 43210.",
    server: "Your request didn't send. Check your connection and try again, or email us.",
  },
  success: {
    heading: "Request received.",
    body: "We'll send your audit within 5 working days.",
  },
  privacy: "We use these details only to prepare your audit and contact you about it. We don't share them.",
};
