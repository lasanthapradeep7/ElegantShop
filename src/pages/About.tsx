import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ElegantShop</h1>
          <p className="text-xl text-gray-600">
            We believe in the beauty of simplicity and the power of thoughtful design.
          </p>
        </div>
        
        {/* Story Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2018, ElegantShop was born from a passion for simplicity, quality, and thoughtful design. 
                  We started with a simple idea: to create products that enhance people's lives through their functionality and beauty.
                </p>
                <p>
                  What began as a small collection of minimalist home products has grown into a curated selection of items 
                  spanning multiple categories. Throughout our journey, we've maintained our commitment to quality materials, 
                  ethical production, and timeless design.
                </p>
                <p>
                  Today, we continue to collaborate with talented designers and skilled craftspeople who share our vision 
                  and values. Each product is carefully considered, designed to last, and created with respect for both 
                  people and the environment.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2574&auto=format&fit=crop"
                alt="ElegantShop founders"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="max-w-5xl mx-auto py-20 border-t border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Our mission is to create products that enhance people's lives through thoughtful design, 
                premium quality, and sustainable practices. We strive to make beautiful, functional items 
                accessible to all who appreciate good design.
              </p>
            </div>
            
            <div className="animate-fade-in delay-150">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                We envision a world where people are surrounded by objects that are both beautiful and 
                functional, where less is more, and where quality is valued over quantity. We aim to be a 
                leading voice in promoting conscious consumption and timeless design.
              </p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="max-w-5xl mx-auto my-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3-1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3-1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We are committed to creating products of exceptional quality that are made to last, 
                reducing waste and offering better value over time.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in delay-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simplicity</h3>
              <p className="text-gray-600">
                We believe in the power of simplicity – designing products that are elegant, 
                functional, and free from unnecessary complexity.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in delay-200">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 0-18z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We prioritize sustainable materials and ethical manufacturing processes, 
                striving to minimize our environmental footprint.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center animate-fade-in">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop"
                  alt="John Smith"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">John Smith</h3>
              <p className="text-sm text-primary mb-3">Founder & CEO</p>
              <p className="text-sm text-gray-600">
                With a background in design and business, John brings 15 years of experience 
                in creating products that balance beauty and functionality.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center animate-fade-in delay-100">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-sm text-primary mb-3">Creative Director</p>
              <p className="text-sm text-gray-600">
                Sarah oversees all creative aspects of our product development, bringing her expertise 
                in minimalist design and attention to detail.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center animate-fade-in delay-200">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                  alt="Michael Chen"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-sm text-primary mb-3">Head of Product</p>
              <p className="text-sm text-gray-600">
                Michael focuses on ensuring that our products meet the highest standards of quality, 
                durability, and user experience.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden relative mb-16">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2670&auto=format&fit=crop" 
              alt="Join our community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
          </div>
          
          <div className="relative py-24 px-8 sm:py-32 sm:px-16 text-white">
            <div className="max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-white/80 mb-8">
                Subscribe to our newsletter to stay updated on new products, design insights, and special offers.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
