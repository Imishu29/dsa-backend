// routes/visitor.routes.js
const express = require('express');
const jsonParser = express.json();
const Visitor = require('../models/portfolio_visitor');

const router = express.Router();

/**
 * POST /api/visitors
 * Create a new visitor message
 */
router.post(
  '/',jsonParser,
  async (req, res) => {
    

    try {
      const doc = await Visitor.create(req.body);
      return res.status(201).json(doc);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create visitor' });
    }
  }
);

/**
 * GET /api/visitors
 * List all visitors (latest first)
 */
router.get('/', async (_req, res) => {
  try {
    const list = await Visitor.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch visitors' });
  }
});

/**
 * GET /api/visitors/:id
 * Get single visitor by id (optional)
 */
router.get(
  '/:id',
  async (req, res) => {
    

    try {
      const doc = await Visitor.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      return res.json(doc);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch visitor' });
    }
  }
);

module.exports = router;
