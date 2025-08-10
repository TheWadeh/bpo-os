const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createJob = async (req, res) => {
  const { title, description, requirements, location, jobType, salaryRange, companyName } = req.body;
  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements,
        location,
        jobType,
        salaryRange,
        companyName,
        postedById: req.user.id,
      },
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Please provide all required fields' });
  }
};

exports.updateJob = async (req, res) => {
  const { title, description, requirements, location, jobType, salaryRange, companyName } = req.body;
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        requirements,
        location,
        jobType,
        salaryRange,
        companyName,
      },
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await prisma.job.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
