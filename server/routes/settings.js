import { Router } from 'express';
import auth from '../middleware/auth.js';
import Setting from '../models/Setting.js';

const router = Router();

// GET all settings (public so frontend can read them)
router.get('/', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    const settings = await Setting.find();
    // Convert array of {key, value} to a single object {key: value}
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings.', error: error.message });
  }
});

// PUT / bulk update settings (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const updates = req.body; // Expects an object { key: value }
    const promises = Object.entries(updates).map(([key, value]) => {
      return Setting.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
      );
    });
    await Promise.all(promises);
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings.', error: error.message });
  }
});

export default router;
