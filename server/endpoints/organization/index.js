const express = require('express');
const { prisma } = require('../../utils/prisma');

const router = express.Router();

// 建立新組織
router.post('/organization', async function(req, res) {
  try {
    const { name, description } = req.body;
    const organization = await prisma.organization.create({
      data: {
        name,
        description,
      }
    });
    return res.json({ organization });
  } catch (error) {
    console.error('Create organization error:', error);
    return res.status(500).json({ error: 'Failed to create organization' });
  }
});

// 取得組織列表
router.get('/organizations', async function(req, res) {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        departments: true,
        groups: true,
      }
    });
    return res.json({ organizations });
  } catch (error) {
    console.error('Fetch organizations error:', error);
    return res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

module.exports = router; 