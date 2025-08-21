'use client'
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Shield,

  Target,
  Eye,
  Heart,
  Linkedin,
  Twitter,
  Mail,
  ChevronLeft,

} from 'lucide-react';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  const officers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Chief Executive Officer & Founder",
      image: "/api/placeholder/300/300",
      bio: "With over 15 years in cybersecurity, Dr. Johnson holds a Ph.D. in Computer Science and multiple CISSP certifications. She founded  Klitz Cyber Security with a vision to make enterprise-grade security accessible to all businesses.",
      expertise: ["Strategic Security Planning", "Risk Management", "Compliance Frameworks"],
      education: ["Ph.D. Computer Science - MIT", "M.S. Cybersecurity - Stanford"],
      certifications: ["CISSP", "CISM", "CISSP-ISSMP"]
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "/api/placeholder/300/300",
      bio: "A seasoned security architect with expertise in cloud security and threat intelligence. Michael leads our technical teams and oversees the development of cutting-edge security solutions.",
      expertise: ["Cloud Security", "Threat Intelligence", "Security Architecture"],
      education: ["M.S. Information Security - Carnegie Mellon", "B.S. Computer Engineering - UC Berkeley"],
      certifications: ["CISSP", "SABSA", "TOGAF"]
    },
    {
      name: "Jennifer Williams",
      position: "Chief Operating Officer",
      image: "/api/placeholder/300/300",
      bio: "Former consultant at top-tier security firms, Jennifer brings operational excellence and client relationship expertise to ensure seamless service delivery and client satisfaction.",
      expertise: ["Operations Management", "Client Relations", "Process Optimization"],
      education: ["MBA - Wharton School", "B.A. Business Administration - Harvard"],
      certifications: ["PMP", "ITIL", "Six Sigma Black Belt"]
    },
    {
      name: "David Rodriguez",
      position: "Head of Training & Education",
      image: "/api/placeholder/300/300",
      bio: "An industry veteran with 12+ years in cybersecurity education. David designs and delivers our comprehensive training programs that have educated over 5,000 security professionals.",
      expertise: ["Cybersecurity Training", "Curriculum Development", "Certification Programs"],
      education: ["M.Ed. Educational Technology - NYU", "B.S. Information Systems - Georgia Tech"],
      certifications: ["CISSP", "CEH", "GSEC"]
    }
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", description: " Klitz Cyber Security established with a mission to democratize enterprise cybersecurity." },
    { year: "2019", title: "First 100 Clients", description: "Reached our first major milestone, serving clients across various industries." },
    { year: "2020", title: "ISO 27001 Certified", description: "Achieved ISO 27001 certification, demonstrating our commitment to information security." },
    { year: "2021", title: "Training Academy Launch", description: "Launched comprehensive cybersecurity training programs and certification courses." },
    { year: "2022", title: "Regional Expansion", description: "Expanded operations across West The world, establishing offices in 3 major cities." },
    { year: "2023", title: "AI Security Division", description: "Launched specialized AI and machine learning security consulting services." },
    { year: "2024", title: "500+ Clients Milestone", description: "Celebrated serving over 500 satisfied clients with zero major security breaches." }
  ];

  return (
    <>
      <Head>
        <title>About Us -  Klitz Cyber Security | Leading Cybersecurity Security</title>
        <meta
          name="description"
          content="Learn about  Klitz Cyber Security's history, mission, and meet our expert leadership team dedicated to securing your digital future."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-cyan-400" />
                <span className="font-bold text-xl"> Klitz Cyber Security</span>
              </Link>
              <Link href="/" className="text-slate-400 hover:text-white flex items-center space-x-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 text-center max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About  Klitz Cyber Security
          </h1>
          <p className="text-lg text-slate-300">
            We are a global cybersecurity Security dedicated to protecting businesses of all sizes with enterprise-grade security, training, and innovation.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <Target className="h-10 w-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-slate-300">To democratize cybersecurity by making cutting-edge protection, tools, and training accessible to all organizations.</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <Eye className="h-10 w-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p className="text-slate-300">A safer digital future where businesses thrive without fear of cyber threats.</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <Heart className="h-10 w-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Values</h3>
            <p className="text-slate-300">Integrity, innovation, and client success guide everything we do.</p>
          </div>
        </section>

        {/* Milestones */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>
          <div className="relative border-l border-slate-700">
            {milestones.map((m, i) => (
              <div key={i} className="mb-10 ml-6">
                <div className="absolute w-3 h-3 bg-cyan-400 rounded-full mt-2 -left-1.5" />
                <h3 className="text-lg font-semibold">{m.year} – {m.title}</h3>
                <p className="text-slate-400">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officers.map((o, i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
                <Image src={o.image} alt={o.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-bold">{o.name}</h3>
                <p className="text-cyan-400 text-sm mb-3">{o.position}</p>
                <p className="text-slate-400 text-sm mb-4">{o.bio}</p>
                <div className="text-left space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm">Expertise</h4>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                      {o.expertise.map((e, idx) => <li key={idx}>{e}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Education</h4>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                      {o.education.map((e, idx) => <li key={idx}>{e}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Certifications</h4>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                      {o.certifications.map((c, idx) => <li key={idx}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-700/50 py-10 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-slate-400">© {new Date().getFullYear()}  Klitz Cyber Security. All rights reserved.</p>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="mailto:info@ Klitz Cyber Securitypro.com" className="hover:text-white"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
