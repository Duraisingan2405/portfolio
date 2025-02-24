// pages/index.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import myProfile from "./assets/profile.png";
import { IMAGE_KEYS } from "./assets/imagelibrary";
import { toast, Toaster } from "react-hot-toast";

const experiences = [
  "Software Engineer at GridDynamics - Developed and maintained scalable fintech applications.",
  "Improved unit test coverage from 60% to 80% for microfrontend components.",
  "Collaborated with international teams for seamless feature rollouts.",
  "Optimized UI/UX to enhance user experience based on stakeholder feedback.",
  "Monitored security vulnerabilities and system health using Datadog alerts.",
];

export default function App() {
  const [dynamicWords, setDynamicWords] = useState([
    "Full Stack Developer",
    "Fintech Application Specialist",
    "React & Spring Boot Expert",
    "Cloud Solutions Explorer",
    "UI/UX Optimization Enthusiast",
    "Tech Explorer",
  ]);

  const [isSubmitting, setSubmitting] = useState(false);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 3000);

    const handleScroll = () => {
      const sections = ["profile", "technologies", "experience", "contact"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(wordChangeInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dynamicWords]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScrollTo = (id) => {
    const targetElement = document.getElementById(id);
    const offset = 70;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="!w-full min-h-screen bg-black text-gray-200 p-4">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50 py-3 px-6 flex justify-center space-x-6">
        {["Profile", "Technologies", "Experience", "Contact"].map(
          (section, index) => (
            <motion.button
              key={section}
              className={`!bg-transparent text-white hover:text-purple-400 cursor-pointer ${
                activeSection.toLowerCase() === section.toLowerCase()
                  ? "text-purple-400"
                  : ""
              }`}
              onClick={() => handleScrollTo(section.toLowerCase())}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {section}
            </motion.button>
          )
        )}
      </nav>

      {/* Profile Section */}
      <motion.div
        id="profile"
        className="text-center mt-24 parallax-effect"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={myProfile}
          alt="Profile"
          className="h-40 mx-auto rounded-full shadow-xl border-4 border-gray-700"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-3xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-wide">
          DURAISINGAN
        </h1>
        <motion.p
          className="text-lg mt-2 h-6"
          key={currentWordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dynamicWords[currentWordIndex]}
        </motion.p>
      </motion.div>

      {/* Technologies Section */}
      <section id="technologies" className="min-h-[30vh] py-10 px-4">
        <h2 className="text-3xl font-light text-gray-300 mb-6 tracking-wide">
          Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["spring", "react", "nextjs", "mysql", "docker"].map(
            (tech, index) => (
              <motion.div
                key={tech}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{
                  delay: index !== 4 ? index * 0.2 : 0.8,
                  duration: 1,
                }}
              >
                <img src={IMAGE_KEYS[tech]} alt={tech} className="w-24 h-24" />
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-[30vh] py-12 px-6 bg-gray-900 mt-10 rounded-3xl shadow-xl mx-4"
      >
        <motion.div
          className="parallax-effect"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl font-light text-gray-300 mb-6 tracking-wide">
            Experience
          </h2>

          <ul className="space-y-4">
            {experiences.map((experience, index) => (
              <li
                key={index}
                className="bg-gray-800 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:bg-gray-700 transition-all duration-300"
              >
                <p className="leading-7">{experience}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Contact Form */}
      {/* <section
        id="contact"
        className="min-h-[30vh] py-10 px-4 bg-gray-800 mt-6"
      >
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2> */}

      <div
        id="contact"
        className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-2xl mt-10"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-3xl font-light text-gray-300 mb-6 tracking-wide">
          Contact Me
        </h2>

        <form
          className="space-y-4"
          action="https://formsubmit.co/dhawadsp@gmail.com"
          method="POST"
          onSubmit={(e) => {
            setSubmitting(true);
            toast.success("Message Sent Successfully!");
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Your Message"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />

          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={window.location.href} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:scale-105"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      {/* </section> */}
    </div>
  );
}
