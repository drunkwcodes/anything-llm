const checkOrganizationAccess = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const username = req.user?.username;

    if (!username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // 檢查使用者是否屬於該組織的任何群組
    const hasAccess = await prisma.groupMember.findFirst({
      where: {
        username,
        group: {
          organizationId,
        }
      }
    });

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking organization access' });
  }
};

module.exports = {
  checkOrganizationAccess,
}; 