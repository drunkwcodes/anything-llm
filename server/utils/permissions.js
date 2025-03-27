const { prisma } = require('./prisma');

async function checkWorkspaceAccess(username, workspaceId) {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        department: true,
      }
    });

    if (!workspace?.departmentId) {
      return true; // 如果工作區沒有部門限制，則允許訪問
    }

    // 檢查使用者是否屬於該部門的任何群組
    const hasAccess = await prisma.groupMember.findFirst({
      where: {
        username,
        group: {
          departmentId: workspace.departmentId,
        }
      }
    });

    return !!hasAccess;
  } catch (error) {
    console.error('Check workspace access error:', error);
    return false;
  }
}

async function checkOrganizationAccess(username, organizationId) {
  try {
    // 檢查使用者是否屬於該組織的任何群組
    const hasAccess = await prisma.groupMember.findFirst({
      where: {
        username,
        group: {
          organizationId,
        }
      }
    });

    return !!hasAccess;
  } catch (error) {
    console.error('Check organization access error:', error);
    return false;
  }
}

module.exports = {
  checkWorkspaceAccess,
  checkOrganizationAccess
}; 