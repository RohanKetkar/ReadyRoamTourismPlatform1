import React from 'react';
import { Users, Plane, Award, Globe2, Menu, X } from 'lucide-react';
import Button from './Button'; // Import the custom Button component
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Router } from '../Route/Route';
const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { icon: <Users className="w-8 h-8 text-indigo-600" />, value: "50,000+", label: "Happy Travelers" },
    { icon: <Plane className="w-8 h-8 text-indigo-600" />, value: "100+", label: "Destinations" },
    { icon: <Award className="w-8 h-8 text-indigo-600" />, value: "15+", label: "Years Experience" },
    { icon: <Globe2 className="w-8 h-8 text-indigo-600" />, value: "24/7", label: "Support" }
  ];

  const teamMembers = [
    {
      name: "Soham Narule",
      role: "Founder & CEO",
      image: "/images/sohamImage.jpg"
    },
    {
      name: "Vaishnavi Sharma",
      role: "Co-Founder",
      image: "/Images/vaishnaviImage.jpg"
    },
    {
      name: "Rohan Ketkar",
      role: "CEO and Director of Travel Operations",
      image: "/Images/rohanImage.jpg"
    },
    {
      name: "Manoj More",
      role: "Vice President of Travel Operations",
      image: "Images/manojImage.png"
    },
    {
      name: "Priti Gedam",
      role: "Travel Expert",
      image: "/Images/pritiImage.jpg"
    },
    { 
      name: "Dipesh Bhambhani",
      role: "Customer Experience",
      image: "/Images/dipeshImage.jpg"
    }
    
    
  ];

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
           
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">ReadyRoam</h1>
            </div>

           
            <nav className="hidden md:flex space-x-8">
              <Link to={Router.DEFAULT} style={{ textDecoration: "none"}}>Home</Link>
              
              <Link to={Router.CONTACTUS}className="text-gray-600 hover:text-indigo-600" style={{ textDecoration: "none"}}>Contact us</Link>
            </nav>

           
           

           
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to={Router.DEFAULT}>Home</Link>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Destinations</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Contact</a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full text-indigo-600 hover:bg-indigo-50">
                  Sign In
                </Button>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow mt-16">
     
        <div className="relative h-96 bg-indigo-600">
          <div className="absolute inset-0 bg-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">ReadyRoam</h1>
              <p className="text-2xl font-light italic">Pack Your Bags, We've Done the Rest</p>
            </div>
          </div>
        </div>

      
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At ReadyRoam, we take pride in handling all the intricate details of travel planning, 
              so you can focus on what matters most – experiencing the world. Our commitment goes 
              beyond just booking trips; we craft journeys that transform your travel dreams into reality.
            </p>
          </div>
        </div>

       
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">The ReadyRoam Difference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Effortless Planning</h3>
                <p className="text-gray-600">
                  We handle every detail of your journey, from transportation and 
                  accommodations to activities and dining recommendations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                <p className="text-gray-600">
                  Our network of local experts ensures you experience the authentic 
                  heart of each destination, not just tourist hotspots.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Travel with peace of mind knowing our dedicated team is always 
                  available to assist you, wherever you are in the world.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
                <p className="text-gray-600">
                  Every itinerary is tailored to your preferences, ensuring 
                  each trip is uniquely yours while maintaining our high standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ReadyRoam</h3>
            <p className="text-gray-400">Making travel dreams come true since 2008</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Destinations</a></li>
              <li><a href="#" className="hover:text-white">Our Team</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Trip Planning</a></li>
              <li><a href="#" className="hover:text-white">Custom Tours</a></li>
              <li><a href="#" className="hover:text-white">Group Travel</a></li>
              <li><a href="#" className="hover:text-white">Travel Insurance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="text-gray-400 space-y-2">
              <p>24/7 Support Available</p>
              <p>Email: hello@readyroam.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ReadyRoam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
