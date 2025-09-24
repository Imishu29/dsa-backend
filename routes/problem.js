const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ chapter: 1, order: 1 });
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add problem (admin only - for seeding data)
router.post('/', async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    const problem = await newProblem.save();
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Seed initial problems
router.post('/seed', async (req, res) => {
  try {
    await Problem.deleteMany({});
    
    const problems = [
      // Arrays
      {
        title: "Two Sum",
        chapter: "Arrays",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=6kTZYvNNyps",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        articleLink: "https://www.geeksforgeeks.org/two-sum-problem/",
        order: 1
      },
      {
        title: "Best Time to Buy and Sell Stock",
        chapter: "Arrays",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU",
        leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        articleLink: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/",
        order: 2
      },
      {
        title: "Contains Duplicate",
        chapter: "Arrays",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=4oZsPXG9B94",
        leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
        articleLink: "https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/",
        order: 3
      },
      {
        title: "Product of Array Except Self",
        chapter: "Arrays",
        level: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=bNvIQI2wAjk",
        leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/",
        articleLink: "https://www.geeksforgeeks.org/a-product-array-puzzle/",
        order: 4
      },
      // Strings
      {
        title: "Valid Anagram",
        chapter: "Strings",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA",
        leetcodeLink: "https://leetcode.com/problems/valid-anagram/",
        articleLink: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/",
        order: 1
      },
      {
        title: "Valid Palindrome",
        chapter: "Strings",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=jJXJ16kPFWg",
        leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",
        articleLink: "https://www.geeksforgeeks.org/check-if-a-string-is-palindrome/",
        order: 2
      },
      {
        title: "Longest Substring Without Repeating Characters",
        chapter: "Strings",
        level: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
        leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        articleLink: "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/",
        order: 3
      },
      // Linked List
      {
        title: "Reverse Linked List",
        chapter: "Linked List",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=iRtLEoL-r-g",
        leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
        articleLink: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
        order: 1
      },
      {
        title: "Merge Two Sorted Lists",
        chapter: "Linked List",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=XIdigk956u0",
        leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
        articleLink: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
        order: 2
      },
      {
        title: "Linked List Cycle",
        chapter: "Linked List",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
        leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",
        articleLink: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
        order: 3
      },
      // Trees
      {
        title: "Maximum Depth of Binary Tree",
        chapter: "Trees",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ",
        leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        articleLink: "https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/",
        order: 1
      },
      {
        title: "Invert Binary Tree",
        chapter: "Trees",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
        leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/",
        articleLink: "https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/",
        order: 2
      },
      {
        title: "Binary Tree Level Order Traversal",
        chapter: "Trees",
        level: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=XZnWETlZZ14",
        leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        articleLink: "https://www.geeksforgeeks.org/level-order-tree-traversal/",
        order: 3
      },
      // Dynamic Programming
      {
        title: "Climbing Stairs",
        chapter: "Dynamic Programming",
        level: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
        leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
        articleLink: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/",
        order: 1
      },
      {
        title: "House Robber",
        chapter: "Dynamic Programming",
        level: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=73r3KWiEvyk",
        leetcodeLink: "https://leetcode.com/problems/house-robber/",
        articleLink: "https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/",
        order: 2
      },
      {
        title: "Longest Increasing Subsequence",
        chapter: "Dynamic Programming",
        level: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=cjWnW0hdF1Y",
        leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/",
        articleLink: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/",
        order: 3
      }
    ];
    
    await Problem.insertMany(problems);
    res.json({ message: 'Problems seeded successfully', count: problems.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;