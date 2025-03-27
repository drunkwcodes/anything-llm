const express = require('express');
const { prisma } = require('../../utils/prisma');
const { requiresAuth } = require('../../utils/auth');
const { checkOrganizationAccess } = require('../../utils/permissions');

const router = express.Router();

// 建立部門
router.post('/department', async function(req, res) {
  try {
    const { name, description, organizationId } = req.body;
    const department = await prisma.department.create({
      data: {
        name,
        description,
        organizationId,
      }
    });
    return res.json({ department });
  } catch (error) {
    console.error('Create department error:', error);
    return res.status(500).json({ error: 'Failed to create department' });
  }
});

// 取得組織的所有部門
router.get('/organization/:organizationId/departments', async function(req, res) {
  try {
    const { organizationId } = req.params;
    const departments = await prisma.department.findMany({
      where: {
        organizationId
      },
      include: {
        groups: true,
        workspaces: true
      }
    });
    return res.json({ departments });
  } catch (error) {
    console.error('Fetch departments error:', error);
    return res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// 取得特定部門資訊
router.get('/department/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        groups: true,
        workspaces: true
      }
    });
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.json({ department });
  } catch (error) {
    console.error('Get department error:', error);
    return res.status(500).json({ error: 'Failed to fetch department' });
  }
});

// 更新部門資訊
router.put('/department/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
      include: {
        groups: true,
        workspaces: true
      }
    });
    if (!existingDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // 檢查使用者是否有權限更新該部門
    const hasAccess = await checkOrganizationAccess(req.user.username, existingDepartment.organizationId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied to this department' });
    }

    const department = await prisma.department.update({
      where: { id },
      data: {
        name,
        description
      },
      include: {
        groups: true,
        workspaces: true
      }
    });
    return res.json({ department });
  } catch (error) {
    console.error('Update department error:', error);
    return res.status(500).json({ error: 'Failed to update department' });
  }
});

// 刪除部門
router.delete('/department/:id', async function(req, res)  {
  try {
    const { id } = req.params;

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
      include: {
        groups: true,
        workspaces: true
      }
    });
    if (!existingDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // 檢查使用者是否有權限刪除該部門
    const hasAccess = await checkOrganizationAccess(req.user.username, existingDepartment.organizationId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied to this department' });
    }

    await prisma.department.delete({
      where: { id },
      include: {
        groups: true,
        workspaces: true
      }
    });
    return res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Delete department error:', error);
    return res.status(500).json({ error: 'Failed to delete department' });
  }
});

module.exports = router; 