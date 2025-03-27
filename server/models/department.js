const { prisma } = require('../utils/prisma');

class Department {
  static async create({ name, description, organizationId }) {
    try {
      return await prisma.department.create({
        data: {
          name,
          description,
          organizationId,
        }
      });
    } catch (error) {
      console.error('Create department error:', error);
      throw error;
    }
  }

  static async list(organizationId) {
    try {
      return await prisma.department.findMany({
        where: {
          organizationId
        },
        include: {
          groups: true,
          workspaces: true
        }
      });
    } catch (error) {
      console.error('List departments error:', error);
      throw error;
    }
  }

  static async get(id) {
    try {
      return await prisma.department.findUnique({
        where: { id },
        include: {
          groups: true,
          workspaces: true
        }
      });
    } catch (error) {
      console.error('Get department error:', error);
      throw error;
    }
  }

  static async update(id, { name, description }) {
    try {
      return await prisma.department.update({
        where: { id },
        data: {
          name,
          description,
        }
      });
    } catch (error) {
      console.error('Update department error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await prisma.department.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Delete department error:', error);
      throw error;
    }
  }
}

module.exports = Department; 