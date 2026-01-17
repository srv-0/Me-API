require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./models/Profile'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});


app.post('/api/profile', async (req, res) => {
  try {
  
    const profile = await Profile.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true, setDefaultsOnInsert: true } 
    );
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    let projects = profile.projects;

    if (skill) {
      projects = projects.filter(p => 
        p.techStack && p.techStack.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query parameter 'q' is required" });

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

   
    const results = {
        skills_match: profile.skills.filter(s => s.toLowerCase().includes(q.toLowerCase())),
        projects_match: profile.projects.filter(p => 
            p.title.toLowerCase().includes(q.toLowerCase()) || 
            p.description.toLowerCase().includes(q.toLowerCase())
        ),
        work_match: profile.work.filter(w => 
            w.company.toLowerCase().includes(q.toLowerCase()) || 
            w.position.toLowerCase().includes(q.toLowerCase())
        )
    };

    res.status(200).json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});