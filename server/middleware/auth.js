const { checkWorkspaceAccess } = require('../utils/permissions');

// ... 現有的 middleware ...

async function requiresWorkspaceAccess(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const username = req.user?.username;

    if (!username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasAccess = await checkWorkspaceAccess(username, workspaceId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking workspace access' });
  }
}

module.exports = {
  // ... 現有的 exports ...
  requiresWorkspaceAccess
}; 