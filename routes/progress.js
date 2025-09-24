const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user progress
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('progress');
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update progress
router.post('/:problemId', async (req, res) => {
  try {
    console.log(req.body)
    const { completed, user } = req.body;
    const usrData = await User.findById(user);
    
    const progressIndex = usrData.progress.findIndex(
      p => p.problemId.toString() === req.params.problemId
    );
    
    if (progressIndex > -1) {
      usrData.progress[progressIndex].completed = completed;
      usrData.progress[progressIndex].completedAt = completed ? new Date() : null;
    } else {
      usrData.progress.push({
        problemId: req.params.problemId,
        completed,
        completedAt: completed ? new Date() : null
      });
    }
    
    await usrData.save();
    res.json(usrData.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/detailed/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('name email progress')
      .populate({
        path: 'progress.problemId',
        select: 'title difficulty category description' // Problem model ke fields
      });
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Calculate statistics
    const totalProblems = user.progress.length;
    const completedProblems = user.progress.filter(p => p.completed).length;
    const completionRate = totalProblems > 0 ? 
      ((completedProblems / totalProblems) * 100).toFixed(2) : 0;

    res.json({
      user: {
        name: user.name,
        email: user.email
      },
      statistics: {
        totalProblems,
        completedProblems,
        pendingProblems: totalProblems - completedProblems,
        completionRate: `${completionRate}%`
      },
      progress: user.progress
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;