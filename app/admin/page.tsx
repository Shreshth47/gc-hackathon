"use client";

import React from "react";

export default function HomePage() {
  return (
    <div>
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/back.jpg')`,
        }}
      ></div>

      {/* Navbar */}
      <header className="navbar flex justify-between items-center px-6 py-4 bg-purple-600 text-white shadow-lg fixed top-0 w-full z-50">
        <div className="logo flex items-center space-x-4">
          <img src="/trophy.png" alt="Logo" className="w-12" />
          <h1 className="text-2xl font-bold">Championship</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-yellow-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Teams
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Scores
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6">
        {/* Hero Section */}
        <section className="hero bg-white shadow-md rounded-lg p-6 mb-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-purple-700">Welcome to</h2>
          <h1 className="text-5xl font-extrabold mb-6">Championship</h1>
          <p className="text-gray-700 text-lg">
            A sports championship is a prestigious event that brings together teams or individuals
            to compete at the highest level within their respective sport. These tournaments are
            often the culmination of a season or series of qualifying rounds, where participants
            showcase their skills, determination, and teamwork to achieve victory. Championships
            create an electrifying atmosphere, fostering a spirit of camaraderie and sportsmanship
            among competitors and fans alike.
          </p>
          <p className="text-gray-700 text-lg mt-4">
            From thrilling matches to intense rivalries, they highlight the passion and dedication
            of athletes striving for excellence. Whether it's on the field, court, track, or arena,
            sports championships unite diverse communities, inspire future generations, and
            celebrate the pursuit of greatness.
          </p>
        </section>

        {/* Events Section */}
        <div className="cover text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Events</h1>
          <section
            className="Event mx-auto bg-cover bg-center rounded-lg shadow-md h-96 w-3/5 max-w-4xl"
            style={{
              backgroundImage: `url('/eve.jpg')`,
            }}
          ></section>
        </div>

        {/* Schedule Section */}
        <div className="cover text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Schedule</h1>
          <section
            className="schedule mx-auto bg-cover bg-center rounded-lg shadow-md h-96 w-3/5 max-w-4xl"
            style={{
              backgroundImage: `url('/sche.avif')`,
            }}
          ></section>
        </div>
      </main>
    </div>
  );
}
