const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createLead = async (req, res) => {
  const { clientId, stage, value, source } = req.body;
  try {
    const lead = await prisma.lead.create({
      data: {
        clientId: parseInt(clientId),
        stage,
        value: parseFloat(value),
        source,
      },
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: 'Please provide all required fields' });
  }
};

exports.updateLead = async (req, res) => {
  const { clientId, stage, value, source } = req.body;
  try {
    const lead = await prisma.lead.update({
      where: { id: parseInt(req.params.id) },
      data: {
        clientId: parseInt(clientId),
        stage,
        value: parseFloat(value),
        source,
      },
    });
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await prisma.lead.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
