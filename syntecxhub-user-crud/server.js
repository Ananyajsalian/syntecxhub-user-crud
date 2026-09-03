import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { Types } from 'mongoose';
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  },
  limits: { fileSize: 2 * 1024 * 1024 }
});

const isValidId = (id) => Types.ObjectId.isValid(id);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);

// Upload
app.post('/api/users/:id/upload', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({error: "No file uploaded"});
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage: `/uploads/${req.file.filename}` },
      { new: true }
    );
    if (!user) return res.status(404).json({error: "User not found"});
    res.json({ msg: "File uploaded", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get image URL
app.get('/api/users/:id/image', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({error: "User not found"});
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({ imageUrl: `${baseUrl}${user.profileImage}` });
});

// UPDATE USER
app.put('/api/users/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' })
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE USER
app.delete('/api/users/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' })
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Handle bad JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));