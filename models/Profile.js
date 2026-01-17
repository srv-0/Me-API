const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  skills: [String], 
  
  projects: [
    {
      title: String,
      description: String,
      techStack: [String], 
      links: {
        demo: String,
        repo: String
      }
    }
  ],
  
  work: [
    {
      company: String,
      position: String,
      duration: String,
      description: String
    }
  ],
  
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Profile', ProfileSchema);