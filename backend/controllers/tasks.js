const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status, projectId, assignedTo, priority, dueDate } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId: parseInt(projectId),
        assignedTo: assignedTo ? parseInt(assignedTo) : null,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Please provide all required fields' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, projectId, assignedTo, priority, dueDate } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        status,
        projectId: parseInt(projectId),
        assignedTo: assignedTo ? parseInt(assignedTo) : null,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
