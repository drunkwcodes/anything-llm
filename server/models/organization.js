const { prisma } = require('../utils/prisma');

class Organization {
  static async create({ name, description }) {
    try {
      return await prisma.organization.create({
        data: {
          name,
          description,
        }
      });
    } catch (error) {
      console.error('Create organization error:', error);
      throw error;
    }
  }

  static async list() {
    try {
      return await prisma.organization.findMany({
        include: {
          departments: true,
          groups: true,
        }
      });
    } catch (error) {
      console.error('List organizations error:', error);
      throw error;
    }
  }
}

module.exports = Organization; 