import { Router } from 'express';
import auth from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

// POST /api/upload — upload a single image to Cloudinary
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image.', error: error.message });
  }
});

// POST /api/upload/multiple — upload multiple images
router.post('/multiple', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided.' });
    }
    const results = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
    }));
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images.', error: error.message });
  }
});

// DELETE /api/upload — delete image from cloudinary by URL
router.delete('/', auth, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required.' });

    // Extract public_id from Cloudinary URL
    const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
    if (match && match[1]) {
      const { cloudinary } = await import('../config/cloudinary.js');
      await cloudinary.uploader.destroy(match[1]);
    }
    res.json({ message: 'Image deleted from Cloudinary.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image.', error: error.message });
  }
});

export default router;
