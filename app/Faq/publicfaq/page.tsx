"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Define the type for FAQ
type FAQ = {
  message: string; // Represents the question
  answer?: string; // Represents the answer
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]); // State to hold FAQs
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const faqCollection = collection(db, "faq"); // Reference to the "faq" collection
        const faqSnapshot = await getDocs(faqCollection); // Fetch all documents
        const faqData: FAQ[] = faqSnapshot.docs.map((doc) => ({
          message: doc.data().message, // Map `message` as the question
          answer: doc.data().answer, // Map `answer` as the response
        }));
        setFaqs(faqData); // Update state with fetched FAQs
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setLoading(false); // Ensure loading stops on error
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return <p className="text-center text-lg text-gray-600">Loading FAQs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mb-6 p-4 border-b border-gray-300 bg-gray-50 rounded-lg shadow-sm"
        >
          <p className="text-lg font-bold text-indigo-600 mb-2">{faq.message}</p>
          <p className="text-gray-700 mt-1">
            {faq.answer || <span className="italic text-gray-500">Answer coming soon.</span>}
          </p>
        </div>
      ))}
    </div>
  );
}
