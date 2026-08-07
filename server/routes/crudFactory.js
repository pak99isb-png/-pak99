import { Router } from 'express';
import auth from '../middleware/auth.js';
import { cloudinary } from '../config/cloudinary.js';

const formatMongooseError = (error) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => {
      if (err.kind === 'required') {
        const field = err.path.split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `${field} is required.`;
      }
      return err.message;
    });
    return messages.join('\n');
  }
  return error.message;
};

/**
 * Creates standard CRUD routes for a Mongoose model.
 * GET    /           — Public list all
 * GET    /:id        — Public get one
 * POST   /           — Admin create
 * PUT    /:id        — Admin update
 * DELETE /:id        — Admin delete
 */
const createCrudRoutes = (Model, resourceName) => {
  const router = Router();

  // GET all (public)
  router.get('/', async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${resourceName}s.`, error: error.message });
    }
  });

  // GET one by id (public)
  router.get('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} not found.` });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${resourceName}.`, error: error.message });
    }
  });

  // POST create (admin only)
  router.post('/', auth, async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: `Error creating ${resourceName}.`, error: formatMongooseError(error) });
    }
  });

  // PUT update (admin only)
  router.put('/:id', auth, async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: `${resourceName} not found.` });
      res.json(item);
    } catch (error) {
      console.error(`[CRUD PUT ERROR] ${resourceName}:`, error);
      res.status(400).json({ message: `Error updating ${resourceName}.`, error: formatMongooseError(error) });
    }
  });

  // DELETE (admin only)
  router.delete('/:id', auth, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${resourceName} not found.` });

      // Extract and delete associated Cloudinary images
      const extractPublicIds = (obj) => {
        let ids = [];
        if (!obj) return ids;
        if (typeof obj === 'string') {
          if (obj.includes('cloudinary.com')) {
            const match = obj.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
            if (match) ids.push(match[1]);
          }
        } else if (Array.isArray(obj)) {
          obj.forEach(val => ids.push(...extractPublicIds(val)));
        } else if (typeof obj === 'object') {
          Object.values(obj).forEach(val => ids.push(...extractPublicIds(val)));
        }
        return ids;
      };

      const publicIds = extractPublicIds(item.toObject ? item.toObject() : item);
      
      // Delete each found image from Cloudinary
      for (const pid of publicIds) {
        try {
          await cloudinary.uploader.destroy(pid);
          console.log(`Deleted Cloudinary image: ${pid}`);
        } catch (err) {
          console.error(`Failed to delete Cloudinary image: ${pid}`, err);
        }
      }

      res.json({ message: `${resourceName} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${resourceName}.`, error: error.message });
    }
  });

  return router;
};

export default createCrudRoutes;
