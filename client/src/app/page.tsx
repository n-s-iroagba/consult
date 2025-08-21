// pages/index.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Event } from '../types/types';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Shield, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Lock,
  Eye,
  Zap,
  ArrowRight,
  Star,
  Building2,
} from 'lucide-react';
import api from '@/lib/api';
import logo1 from '../images/Tesla,_Inc.-Logomark-Black-Logo.wine.svg'
import logo2 from '../images/download.jpeg'
import logo3 from '../images/download.png'
import logo4 from '../images/download (1).png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

  const testimonials = [
    {
      name: "Marcus Thompson",
      position: "CISO, Wells Fargo",
      company: "Wells Fargo",
      content: " Klitz Cyber Security transformed our security posture completely. Their comprehensive audit revealed critical vulnerabilities we never knew existed, and their remediation strategy was flawless.",
      rating: 5
    },
    {
      name: "Dr. Kate Welbeck",
      position: "IT Director, Barclays Bank",
      company: "Barclays Bank",
      content: "Outstanding cybersecurity expertise. They helped us achieve full compliance with international standards while maintaining operational efficiency. Truly enterprise-grade service.",
      rating: 5
    },
    {
      name: "James Crown",
      position: "CEO, TechCorp Solutions",
      company: "TechCorp",
      content: "The incident response team&apos;s swift action during our security breach was exceptional. They contained the threat within hours and prevented any data loss. Incredible professionals.",
      rating: 5
    }
  ];
    const enterpriseServices = [
    {
      icon: Shield,
      title: "Enterprise Security Assessment",
      description: "Comprehensive security audits, penetration testing, and vulnerability assessments for large-scale infrastructures.",
      features: ["Network Security Audit", "Application Security Testing", "Infrastructure Assessment", "Compliance Reporting"],
      price: "From $2,500,000"
    },
    {
      icon: Lock,
      title: "24/7 Managed Security Services",
      description: "Round-the-clock monitoring, threat detection, and incident response with our Security Operations Center.",
      features: ["SIEM Management", "Threat Intelligence", "Incident Response", "Security Monitoring"],
      price: "From $1,800,000/month"
    },
    {
      icon: Eye,
      title: "Compliance & Risk Management",
      description: "Ensure regulatory compliance with ISO 27001, NIST, GDPR, and local data protection requirements.",
      features: ["Compliance Audit", "Risk Assessment", "Policy Development", "Staff Training"],
      price: "From $3,200,000"
    },
    {
      icon: Zap,
      title: "Incident Response & Forensics",
      description: "Rapid response to security breaches with digital forensics and recovery planning services.",
      features: ["Emergency Response", "Digital Forensics", "Recovery Planning", "Legal Support"],
      price: "From $5,000,000"
    }
  ];
   const stats = [
    { number: "500+", label: "Enterprise Clients", sublabel: "Across 15 Countries" },
    { number: "99.7%", label: "Threat Prevention", sublabel: "Success Rate" },
    { number: "24/7", label: "SOC Monitoring", sublabel: "Never Sleep" },
    { number: "50+", label: "Security Experts", sublabel: "Certified Professionals" }
  ];
   const clientLogos = [logo4,
    logo1, logo2, logo3
  ];
const HomePage: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [upcomingEvents, setEvents] = useState<Event[]>([]);
  const router = useRouter()




    useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get<Event[]>('/event'); // Replace with your API route
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, [])
 

 

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title> Klitz Cyber Security - Enterprise Cybersecurity Solutions & Training</title>
        <meta name="description" content="Premier cybersecurity Security providing enterprise-grade security solutions, 24/7 monitoring, compliance consulting, and professional training for businesses across The world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

      </Head>

      <div className="min-h-screen bg-black font-inter">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Shield className="h-10 w-10 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight"> Klitz Cyber Security</span>
                  <span className="text-2xl font-light text-cyan-400 tracking-tight">Security</span>
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-10">
                <Link href="/" className="text-white font-medium hover:text-cyan-400 transition-colors">Services</Link>
                <Link href="/about" className="text-slate-400 font-medium hover:text-cyan-400 transition-colors">About</Link>
                <Link href="/events" className="text-slate-400 font-medium hover:text-cyan-400 transition-colors">Training</Link>
                <Link href="/contact" className="text-slate-400 font-medium hover:text-cyan-400 transition-colors">Contact</Link>
                <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                  Get Assessment
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 text-sm font-medium">Trusted by 500+ Enterprise Clients</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                Enterprise
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Cybersecurity
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-slate-400 mt-4">
                  That Never Sleeps
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                Protect your business with military-grade security solutions. From 24/7 SOC monitoring 
                to advanced threat intelligence, we secure The world&apos;s largest enterprises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 flex items-center">
                  Schedule Security Assessment
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-slate-600 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 flex items-center">
                  <Play className="mr-3 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
                    <div className="text-slate-400 text-sm">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-slate-400 text-lg font-medium">Trusted by World&apos;s Leading Enterprises</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
              {clientLogos.map((logo, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all duration-300">
                    <Image src={logo} alt={`Logo ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Services */}
        <section className="py-24 bg-gradient-to-b from-slate-900/50 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-6 py-3 mb-8">
                <Building2 className="h-4 w-4 text-cyan-400" />
                <span className="text-slate-300 text-sm font-medium">Enterprise Solutions</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                Military-Grade
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Security Solutions
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive cybersecurity services designed for enterprises that can&apos;t afford downtime or data breaches.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {enterpriseServices.map((service, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-4 rounded-xl border border-cyan-500/20">
                        <service.icon className="h-8 w-8 text-cyan-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{service.price}</div>
                        <div className="text-slate-400 text-sm">Starting from</div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                      Get Custom Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Trusted by Security Leaders
              </h2>
              <p className="text-xl text-slate-300">What CISOs and IT Directors say about our services</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl p-12 backdrop-blur-sm">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8 italic">
                    &quot;{testimonials[activeTestimonial].content}&quot;
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-semibold text-white">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-cyan-400 font-medium">
                        {testimonials[activeTestimonial].position}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-cyan-400' : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-24 bg-gradient-to-b from-slate-900/30 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-16">
              <div>
                <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-6 py-3 mb-6">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span className="text-slate-300 text-sm font-medium">Professional Development</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Elite Training
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Programs
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl">
                  Executive-level cybersecurity training for professionals and organizations
                </p>
              </div>
              <Link href="/events" className="hidden lg:inline-flex items-center bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:border-cyan-400 transition-all">
                View All Programs
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-500/20">
                        {event.category}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{event.price}</div>
                        <div className="text-slate-400 text-xs">per person</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-slate-400 mb-6 text-sm">{event.description}</p>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex items-center text-slate-300">
                        <Calendar className="h-4 w-4 mr-3 text-cyan-400" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} at {event.time}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <MapPin className="h-4 w-4 mr-3 text-cyan-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <Users className="h-4 w-4 mr-3 text-cyan-400" />
                        For {event.attendees}
                      </div>
                    </div>
                    
                    <button
                    onClick={()=>router.push(`/attend/${event.id}`)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 lg:hidden">
              <Link href="/events" className="inline-flex items-center bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:border-cyan-400 transition-all">
                View All Programs
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-gradient-to-b from-slate-900/50 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Ready to Secure
                    <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Your Enterprise?
                    </span>
                  </h2>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Get a comprehensive security assessment and personalized recommendations from our expert team.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-4 rounded-xl border border-cyan-500/20">
                      <Mail className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Business Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Company Size</label>
                    <select className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors">
                      <option value="">Select company size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Security Challenge</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      placeholder="Tell us about your current security challenges or requirements..."
                    ></textarea>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                    Get Free Assessment Worth $500,000
                  </button>
                  
                  <p className="text-xs text-slate-400 text-center">
                    By submitting, you agree to our privacy policy. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mt-20">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-full h-96 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                  <div className="text-center text-slate-400">
                    <MapPin className="h-16 w-16 mx-auto mb-6 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white mb-2">Our Georgia Headquarters</h3>
                    <p className="text-lg font-medium mb-4"> 2345 Heritage Park Cir NW, Kennesaw, GA, 30144, USA</p>
                    <div className="space-y-2 text-sm">
                      <p>24/7 Security Operations Center</p>
                      <p>Executive Briefing Center</p>
                      <p>Training Facilities Available</p>
                    </div>
                       <h3 className="text-2xl font-bold text-white mb-2">Reach Us</h3>
                    <p className="text-lg font-medium mb-4"> +1 (337) 287-0951</p>
                  
                    <button className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="relative">
                    <Shield className="h-12 w-12 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-white tracking-tight"> Klitz Cyber Security</span>
                    <span className="text-3xl font-light text-cyan-400 tracking-tight">Security</span>
                  </div>
                </div>
                <p className="text-slate-300 mb-8 max-w-md leading-relaxed">
                  The world&apos;s premier cybersecurity Security, protecting enterprises with military-grade security 
                  solutions and world-class training programs.
                </p>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center hover:border-cyan-400 cursor-pointer transition-all group">
                    <span className="text-cyan-400 font-bold group-hover:scale-110 transition-transform">in</span>
                  </div>
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center hover:border-cyan-400 cursor-pointer transition-all group">
                    <span className="text-cyan-400 font-bold group-hover:scale-110 transition-transform">t</span>
                  </div>
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center hover:border-cyan-400 cursor-pointer transition-all group">
                    <span className="text-cyan-400 font-bold group-hover:scale-110 transition-transform">@</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Enterprise Services</h4>
                <div className="space-y-4">
                  <Link href="/services/assessment" className="block text-slate-300 hover:text-cyan-400 transition-colors">Security Assessment</Link>
                  <Link href="/services/monitoring" className="block text-slate-300 hover:text-cyan-400 transition-colors">24/7 SOC Monitoring</Link>
                  <Link href="/services/compliance" className="block text-slate-300 hover:text-cyan-400 transition-colors">Compliance & Risk</Link>
                  <Link href="/services/incident" className="block text-slate-300 hover:text-cyan-400 transition-colors">Incident Response</Link>
                  <Link href="/services/consulting" className="block text-slate-300 hover:text-cyan-400 transition-colors">Security Consulting</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Training Programs</h4>
                <div className="space-y-4">
                  <Link href="/training/leadership" className="block text-slate-300 hover:text-cyan-400 transition-colors">Executive Leadership</Link>
                  <Link href="/training/technical" className="block text-slate-300 hover:text-cyan-400 transition-colors">Technical Training</Link>
                  <Link href="/training/certification" className="block text-slate-300 hover:text-cyan-400 transition-colors">Certifications</Link>
                  <Link href="/training/custom" className="block text-slate-300 hover:text-cyan-400 transition-colors">Custom Programs</Link>
                  <Link href="/training/online" className="block text-slate-300 hover:text-cyan-400 transition-colors">Online Learning</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Company</h4>
                <div className="space-y-4">
                  <Link href="/about" className="block text-slate-300 hover:text-cyan-400 transition-colors">About Us</Link>
                  <Link href="/careers" className="block text-slate-300 hover:text-cyan-400 transition-colors">Careers</Link>
                  <Link href="/partners" className="block text-slate-300 hover:text-cyan-400 transition-colors">Partners</Link>
                  <Link href="/news" className="block text-slate-300 hover:text-cyan-400 transition-colors">News & Media</Link>
                  <Link href="/contact" className="block text-slate-300 hover:text-cyan-400 transition-colors">Contact Us</Link>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-16 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="flex items-center space-x-8 mb-6 lg:mb-0">
                  <p className="text-slate-400 text-sm">
                    © 2024  Klitz Cyber Security. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">SOC Online</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
                  <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Terms of Service</Link>
                  <Link href="/security" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Security</Link>
                  <Link href="/compliance" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Compliance</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* <style jsx global>{`
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, &apos;Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style> */}
    </>
  );
};

export default HomePage;
                    