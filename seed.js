require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');

const myData = {
  name: "Saurav Singh", 
  email: "sauravsingh1216@gmail.com", 
  education: [
    {
      degree: "Bachelors of Technology",
      institution: "National Institute of Technology, Delhi",
      year: "2023 - 2027" 
    }
  ],
  skills: [
    "Full Stack Developement", "Web Developement", "Java (DSA+OOPs)", "Python", "JavaScript",
    "Node.js", "Express.js", "SQL (MySQL, PostgreSQL)", "DBMS", "MongoDB", "CRUD operations", "MERN ", 
    " HTML", "CSS", "JavaScript", "React.js", "REST APIs", "JWT", "Next.js ", 
    "Git/GitHub", "Postman", "MATLAB", "Docker", "LLM tools (LangChain / LangGraph", "tool calling", "RAG basics)",
  ],
  projects: [
    {
      title: "Medikart | Healthcare Delivery Website",
      description: "A full-stack healthcare website using MERN stack, achieving a 100/100-page speed score for accessibility and implemented cart functionality with Context API, real-time notifications, Stripe API integration for payments.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "MERN"],
      links: {
        repo: "https://github.com/srv-0/HealthCareProject",
        demo: "https://medikartwebsite.vercel.app/"
      }
    },
    {
      title: "Agri ProPlus | Extensive Agriculture Assistance Tool",
      description: "Built the frontend using React, Chakra UI, integrating news and YouTube APIs to deliver farming content and executed user authentication with Firebase, customized a Python scraper for extracting agricultural schemes data, stored in MongoDB and served via Node.js/Express backend.",
      techStack: ["React.js", "FireBase", "MongoDB"],
      links: {
        demo: "https://agriproplus.vercel.app/", 
        repo: "https://github.com/srv-0/Agri-ProPlus"
      }
    }
  ],
  work: [
    {
      company: "Bansal Engineers (Bansal Group)",
      position: "Intern",
      duration: "May 2024 - July 2024",
      description: "Web Developement Intern"
    }
  ],
  links: [{
    github: "https://github.com/srv-0",
    linkedin: "https://www.linkedin.com/in/saurav-singh-srv16/",
    portfolio: "https://github.com/srv-0?tab=repositories"
  }]
};


const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");

   
    await Profile.deleteMany({});
    console.log("Cleared old profile data.");

    
    await Profile.create(myData);
    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();