import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Shield, Award, Users, Lightbulb, Globe, MessageSquare } from "lucide-react";

// Import team member images
import team1Image from "../../assets/TeamImage/1.jpg";
import team2Image from "../../assets/TeamImage/2.jpg";
import team3Image from "../../assets/TeamImage/3.jpg";
import team4Image from "../../assets/TeamImage/4.jpg";
import team5Image from "../../assets/TeamImage/5.jpg";
import team6Image from "../../assets/TeamImage/6.png";
import team7Image from "../../assets/TeamImage/7.jpg";
import team8Image from "../../assets/TeamImage/8.jpg";

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image: team1Image,
    bio: "Dr. Johnson has over 15 years of experience in emergency medicine and healthcare technology. She leads our medical advisory board and ensures all MediCheck features are clinically accurate and beneficial.",
    education: "MD, Stanford University",
    expertise: ["Emergency Medicine", "Healthcare Technology", "Remote Patient Monitoring"],
    publications: ["Modern Approaches to Remote Patient Monitoring", "Telemedicine in Emergency Care"]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder & CEO",
    image: team2Image,
    bio: "Michael founded MediCheck after experiencing firsthand the challenges of monitoring his father's health remotely. With a background in software engineering and healthcare, he's passionate about making health monitoring accessible to everyone.",
    education: "MS Computer Science, MIT",
    expertise: ["Healthcare Innovation", "Software Development", "Product Strategy"],
    publications: ["The Future of Personal Health Monitoring", "Accessibility in Health Tech"]
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Lead Data Scientist",
    image: team3Image,
    bio: "Aisha specializes in machine learning algorithms that power MediCheck's predictive health insights. Her work helps users understand trends in their health data and receive personalized recommendations.",
    education: "PhD in Artificial Intelligence, Carnegie Mellon University",
    expertise: ["Machine Learning", "Health Analytics", "Predictive Modeling"],
    publications: ["Neural Networks in Health Prediction", "Ethical AI in Healthcare"]
  },
  {
    id: 4,
    name: "Robert Williams",
    role: "Director of Engineering",
    image: team4Image,
    bio: "Robert leads our engineering team, focusing on building reliable, secure, and scalable systems. He's an advocate for user privacy and ensures all MediCheck's features protect sensitive health data.",
    education: "BS Computer Engineering, Georgia Tech",
    expertise: ["System Architecture", "Data Security", "IoT Integration"],
    publications: ["Secure Health Data Systems", "Integrating Wearable Technology"]
  },
  {
    id: 5,
    name: "Dr. Maria Rodriguez",
    role: "Medical Research Lead",
    image: team5Image,
    bio: "Dr. Rodriguez oversees our clinical research partnerships and validation studies. Her work ensures that MediCheck's features are grounded in the latest medical research and clinical best practices.",
    education: "MD/PhD, Johns Hopkins University",
    expertise: ["Clinical Research", "Digital Health Validation", "Cardiology"],
    publications: ["Validation of Consumer Health Devices", "Digital Biomarkers in Chronic Disease"]
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Head of User Experience",
    image: team6Image,
    bio: "James is dedicated to making complex health data simple and actionable for users of all ages and technical abilities. He leads our user research initiatives and ensures MediCheck is accessible and intuitive.",
    education: "MFA Design, Rhode Island School of Design",
    expertise: ["Accessible Design", "Health Information Visualization", "User Research"],
    publications: ["Designing for Health Literacy", "Inclusive Health Interfaces"]
  },
  {
    id: 7,
    name: "Sophia Lee",
    role: "Partnerships Director",
    image: team7Image,
    bio: "Sophia manages our relationships with healthcare providers, insurance companies, and device manufacturers. She works to create an ecosystem where health data can flow securely between systems for better patient care.",
    education: "MBA, Wharton School of Business",
    expertise: ["Healthcare Partnerships", "Business Development", "Digital Health Ecosystems"],
    publications: ["Connected Care Models", "Value-Based Healthcare Partnerships"]
  },
  {
    id: 8,
    name: "Dr. Thomas Okonjo",
    role: "Advisory Board Member",
    image: team8Image,
    bio: "Dr. Okonjo brings global health perspective to MediCheck. With experience implementing health technology in resource-limited settings, he advises on making our solutions accessible to diverse populations worldwide.",
    education: "MD, University of Lagos; MPH, Harvard University",
    expertise: ["Global Health", "Health Equity", "Telehealth Implementation"],
    publications: ["Digital Health in Low-Resource Settings", "Reducing Health Disparities Through Technology"]
  }
];

// Department filters
const departments = [
  "All",
  "Leadership",
  "Medical",
  "Engineering",
  "Design",
  "Research",
  "Business",
  "Advisory Board"
];

// Map roles to departments for filtering
const roleToDepartment = {
  "Founder & CEO": "Leadership",
  "Chief Medical Officer": "Medical",
  "Lead Data Scientist": "Engineering",
  "Director of Engineering": "Engineering",
  "Medical Research Lead": "Research",
  "Head of User Experience": "Design",
  "Partnerships Director": "Business",
  "Advisory Board Member": "Advisory Board"
};

function TeamPage() {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState("All");

  const handleTeamMemberClick = (member) => {
    setSelectedTeamMember(member);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setSelectedTeamMember(null);
  };

  const handleDepartmentFilter = (department) => {
    setActiveDepartment(department);
  };

  // Filter team members based on selected department
  const filteredTeamMembers = activeDepartment === "All"
    ? teamMembers
    : teamMembers.filter(member => roleToDepartment[member.role] === activeDepartment);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Team Member Detail Modal */}
      {selectedTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h2 className="text-xl  md:text-2xl  font-bold text-blue-800">{selectedTeamMember.name}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="mt-6 md:flex">
                <div className="md:w-1/3">
                  <img
                    src={selectedTeamMember.image}
                    alt={selectedTeamMember.name}
                    className="rounded-lg shadow-md w-full max-w-xs mx-auto"
                  />
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-700">{selectedTeamMember.role}</p>
                    <p className=" text-xs md:text-sm text-gray-600 mt-2">{selectedTeamMember.education}</p>
                  </div>
                </div>

                <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
                  <h3 className="font-semibold text-lg text-gray-900">About</h3>
                  <p className="mt-2 text-gray-700">{selectedTeamMember.bio}</p>

                  <h3 className="font-semibold text-lg text-gray-900 mt-6">Areas of Expertise</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTeamMember.expertise.map((area, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 mt-6">Publications</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {selectedTeamMember.publications.map((pub, index) => (
                      <li key={index}>{pub}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="md:text-4xl text-2xl font-bold text-blue-800">Our Team</h1>
          <p className="mt-4 md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals behind MediCheck - healthcare professionals, engineers, data scientists, and designers united by a mission to revolutionize personal health monitoring.
          </p>
        </div>

        {/* Department filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => handleDepartmentFilter(department)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeDepartment === department
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {department}
              </button>
            ))}
          </div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => handleTeamMemberClick(member)}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="mt-3 text-gray-700 line-clamp-3">{member.bio}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-blue-600 md:text-sm text:xs font-medium">View Profile</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Board section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="md:text-3xl text-xl font-bold text-blue-800">Medical Advisory Board</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our products and features are reviewed by a distinguished panel of healthcare professionals who ensure MediCheck meets the highest standards of medical accuracy and patient care.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg md:text-xl md:mx-5 md:text-start text-center font-bold text-blue-800">Board Responsibilities</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-700">Review health monitoring algorithms and thresholds</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-700">Validate health recommendations and insights</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-700">Guide emergency response protocols</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-700">Ensure medical information accuracy</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-700">Advise on health data privacy standards</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:mx-5 md:text-start text-center font-bold text-blue-800">Clinical Expertise</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {["Cardiology", "Emergency Medicine", "Internal Medicine", "Digital Health", "Data Science", "Public Health", "Geriatrics", "Pediatrics"].map((specialty, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <span className="text-gray-700 text-sm md:text-base">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team section */}
        <section className="mt-24 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-xl md:text-3xl font-bold">Join Our Team</h2>
                <p className="mt-4">
                  We&apos;re always looking for talented individuals passionate about healthcare innovation.
                  Join us in building the future of personal health monitoring.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Competitive compensation and benefits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Remote-first, flexible work environment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mission-driven work that impacts lives</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <Link to="/careers">
                  <button className="bg-white text-blue-700 hover:bg-blue-50 transition px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold shadow-lg">
                    View Open Positions
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values section */}
        <section className="mt-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "User Privacy First",
                description: "We believe your health data belongs to you. We maintain the highest standards of security and privacy in everything we build.",
                icon: <Shield className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Clinical Excellence",
                description: "We're committed to medical accuracy and clinical validation. Our features are designed with healthcare professionals and based on scientific evidence.",
                icon: <Award className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Accessibility For All",
                description: "We design our products to be usable by everyone, regardless of age, technical ability, or health literacy.",
                icon: <Users className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Continuous Innovation",
                description: "Healthcare technology is constantly evolving, and so are we. We're always exploring new ways to improve health monitoring.",
                icon: <Lightbulb className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Global Perspective",
                description: "Health challenges are universal. We build solutions that can benefit people around the world, including underserved communities.",
                icon: <Globe className="w-5 h-5 text-blue-600" />
              },
              {
                title: "Transparent Communication",
                description: "We're honest about what our technology can and cannot do. We provide clear, straightforward information to our users.",
                icon: <MessageSquare className="w-5 h-5 text-blue-600" />
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg max-w-md md:max-w-lg lg:max-w-xl mx-auto">
  <div className="flex flex-col md:flex-row items-center">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center md:ml-2">
      {value.icon}
    </div>
    <h3 className="text-xl font-semibold text-blue-700 mt-3 md:mt-0 md:ml-4 text-center md:text-left">
      {value.title}
    </h3>
  </div>
  <p className="mt-4 text-gray-600 text-base leading-relaxed text-center md:text-left">
    {value.description}
  </p>
</div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default TeamPage;