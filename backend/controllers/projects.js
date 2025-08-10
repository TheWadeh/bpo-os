const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createProject = async (req, res) => {
  const { name, description, deadline, clientId, status } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : null,
        clientId: parseInt(clientId),
        status,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Please provide all required fields' });
  }
};

exports.updateProject = async (req, res) => {
  const { name, description, deadline, clientId, status } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : null,
        clientId: parseInt(clientId),
        status,
      },
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
