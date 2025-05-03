import ContactForm from "./_components/contactForm";
import FAQItem from "./_components/faqItem";

// FAQ Questions and answers
const faqs = [
  {
    question: "How do I update my profile picture?",
    answer:
      "Go to your profile settings, click 'Edit', and upload a new image. Make sure the image is under 5MB and in JPG or PNG format.",
  },
  {
    question: "How does the AI generate quizzes?",
    answer:
      "Our AI analyzes your uploaded notes and automatically generates multiple-choice or short-answer quizzes based on key concepts and definitions.",
  },
  {
    question: "What file types can I upload?",
    answer:
      "You can upload PDF, DOCX, TXT, and image files. Our AI extracts content and creates flashcards or summaries from them.",
  },
  {
    question: "Can I edit AI-generated flashcards?",
    answer:
      "Yes, you can review and edit flashcards after they’re generated to customize the front and back of each card.",
  },
  {
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition is a proven learning technique that shows you flashcards just before you're likely to forget them — improving long-term retention.",
  },
  {
    question: "How do I track my learning progress?",
    answer:
      "Go to your dashboard to view quiz scores, daily streaks, most-reviewed topics, and AI-generated study suggestions.",
  },
  {
    question: "Is this app free?",
    answer:
      "You can get started for free with limited uploads and quizzes. We also offer premium plans with unlimited access to advanced features.",
  },
  {
    question: "Why isn't my summary or quiz showing up?",
    answer:
      "Please wait a few seconds after uploading your file. If it's still missing, refresh the page or try re-uploading. If the issue persists, contact support.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings > Account and click 'Delete Account'. This will remove all your data permanently from our servers.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Scroll to the bottom of this page and use the contact form, or email us directly at support@learnwithfranny.com.",
  },
];

export default function Help() {
  return (
    <div className="mt-20 px-4 bg-white">
      {/* Title */}
      <div className="text-center">
        <h1 className="font-bold text-6xl">Questions? Look Here.</h1>
        <h2 className="text-xl text-gray-500 mt-2">
          Can't find an answer? Contact us using the form below.
        </h2>
      </div>

      {/* FAQ section spans full width up to 2xl */}
      <div className="mt-10 w-3/4 mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
