const express = require('express');
const Group = require('../../models/group');
const { requiresAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/group', requiresAuth, async (req, res) => {
  try {
    const { name, description, organizationId, departmentId } = req.body;
    const group = await Group.create({ 
      name, 
      description, 
      organizationId, 
      departmentId 
    });
    return res.json({ group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating group' });
  }
});

router.post('/group/:groupId/members', requiresAuth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { username } = req.body;
    const member = await Group.addMember(groupId, username);
    return res.json({ member });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding group member' });
  }
});

module.exports = router; 