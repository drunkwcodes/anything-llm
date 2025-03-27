const { prisma } = require('../utils/prisma');

class Group {
  static async create({ name, description, organizationId, departmentId }) {
    try {
      return await prisma.group.create({
        data: {
          name,
          description,
          organizationId,
          departmentId,
        }
      });
    } catch (error) {
      console.error('Create group error:', error);
      throw error;
    }
  }

  static async addMember(groupId, username) {
    try {
      return await prisma.groupMember.create({
        data: {
          groupId,
          username,
        }
      });
    } catch (error) {
      console.error('Add group member error:', error);
      throw error;
    }
  }
}

module.exports = Group; 