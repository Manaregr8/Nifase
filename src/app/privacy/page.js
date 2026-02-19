export const metadata = {
  title: "Privacy Policy",
  description: "Learn how Nifase collects, uses, and protects your information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "We may collect personal information that you voluntarily provide, including your name, email address, phone number, company details, and any other information you submit through forms such as contact requests, consultation bookings, course inquiries, or newsletter subscriptions.",
      "We may also collect technical data automatically, such as IP address, browser type, pages visited, device information, and approximate location data, to help improve our website performance and user experience.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    list: [
      "Respond to your inquiries and provide requested services.",
      "Process bookings, registrations, and other business requests.",
      "Send service-related updates and relevant communications.",
      "Improve our website, content, offerings, and customer support.",
      "Maintain security, prevent misuse, and comply with legal obligations.",
    ],
  },
  {
    title: "3. Sharing of Information",
    paragraphs: [
      "We do not sell your personal information. We may share your data with trusted service providers who help us operate our website and services (such as hosting, analytics, or communication tools), and only to the extent necessary.",
      "We may also disclose information when required by law, regulation, legal process, or to protect our rights, users, and systems.",
    ],
  },
  {
    title: "4. Data Retention",
    paragraphs: [
      "We retain personal information only as long as needed for the purposes described in this policy, including operational, legal, accounting, or reporting requirements.",
    ],
  },
  {
    title: "5. Data Security",
    paragraphs: [
      "We implement reasonable administrative, technical, and organizational safeguards to protect your information. However, no internet transmission or storage system can be guaranteed as completely secure.",
    ],
  },
  {
    title: "6. Your Choices and Rights",
    paragraphs: [
      "Depending on your location and applicable laws, you may have rights to access, update, correct, or delete your personal information, and to object to or restrict certain processing.",
      "To exercise these rights or opt out of non-essential communications, contact us using the details below.",
    ],
  },
  {
    title: "7. Third-Party Links",
    paragraphs: [
      "Our website may contain links to external websites or services not operated by us. We are not responsible for the privacy practices of third-party websites.",
    ],
  },
  {
    title: "8. Children&apos;s Privacy",
    paragraphs: [
      "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    title: "10. Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy or how we handle your data, please contact us through the Contact page on this website.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-10 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-10">
          <p className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Legal
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">Last updated: February 19, 2026</p>
          <p className="mt-5 max-w-3xl text-slate-700 leading-7 md:text-lg">
            This Privacy Policy explains how Nifase ("we", "our", or "us") collects, uses,
            discloses, and safeguards your information when you use our website, services,
            training programs, and related offerings.
          </p>
        </header>

        <div className="grid gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8"
            >
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-slate-700 leading-7">
                  {paragraph}
                </p>
              ))}

              {section.list?.length ? (
                <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-700 leading-7">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}