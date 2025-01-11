"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Define the type for FAQ
type FAQ = {
  id: string;
  message: string;
  answer?: string;
  timestamp?: string;
};

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]); // Correct type for FAQ data
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Mapping FAQ ID to answer text
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const faqCollection = collection(db, "faq");
        const faqSnapshot = await getDocs(faqCollection);
        const faqData: FAQ[] = faqSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }) as FAQ); // Type assertion ensures the correct structure
        setFaqs(faqData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Handle answer submission
  const handleSubmit = async (faqId: string) => {
    if (!answers[faqId]) {
      setMessage("Please provide an answer before submitting.");
      return;
    }

    try {
      const faqDoc = doc(db, "faq", faqId);
      await updateDoc(faqDoc, { answer: answers[faqId] });
      setMessage("Answer submitted successfully!");
      setAnswers((prev) => ({ ...prev, [faqId]: "" }));
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setMessage("Error submitting the answer. Please try again.");
    }
  };

  if (loading) return <p>Loading FAQs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin FAQ Page</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {faqs.map((faq) => (
        <div key={faq.id} className="mb-6">
          <p className="text-lg font-medium">{faq.message}</p>
          <textarea
            value={answers[faq.id] || ""}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, [faq.id]: e.target.value }))
            }
            placeholder="Write your answer here"
            className="w-full mt-2 p-2 border rounded-md"
          />
          <button
            onClick={() => handleSubmit(faq.id)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit Answer
          </button>
        </div>
      ))}
    </div>
  );
}
