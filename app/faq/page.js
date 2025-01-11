'use client';
import { useState } from 'react';
import Link from 'next/link';
import { db, collection, addDoc } from '../firebaseConfig'; // Adjust the path if needed

export default function Contact() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparing the data to be sent to Firebase
    const messageData = {
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      // Send data to Firebase Firestore in the 'faq' collection
      const docRef = await addDoc(collection(db, 'faq'), messageData);
      console.log('Document written with ID: ', docRef.id);
      alert('Message sent successfully!');
      setMessage(''); // Reset message after successful submission
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error sending message.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">GC Hub</h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li className="hover:text-blue-400">
              <Link href="../publicPage">Home</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../leaderboard">Leaderboard</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../events">Event</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../participation">Participate</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../faq">FAQ</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="../hallRep">Hall Reps</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">FAQs</h2>
          <p className="text-gray-300 mb-6">
            Share your complaints or appreciations with us. We value your feedback!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                Write your complains/appreciations:
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
