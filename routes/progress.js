const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('progress');
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update progress
router.post('/:problemId', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    const user = await User.findById(req.user.id);
    
    const progressIndex = user.progress.findIndex(
      p => p.problemId.toString() === req.params.problemId
    );
    
    if (progressIndex > -1) {
      user.progress[progressIndex].completed = completed;
      user.progress[progressIndex].completedAt = completed ? new Date() : null;
    } else {
      user.progress.push({
        problemId: req.params.problemId,
        completed,
        completedAt: completed ? new Date() : null
      });
    }
    
    await user.save();
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;