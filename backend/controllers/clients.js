const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await prisma.client.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createClient = async (req, res) => {
  const { name, email, phone, company, country, notes } = req.body;
  try {
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        country,
        notes,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: 'Please provide all required fields' });
  }
};

exports.updateClient = async (req, res) => {
  const { name, email, phone, company, country, notes } = req.body;
  try {
    const client = await prisma.client.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        email,
        phone,
        company,
        country,
        notes,
      },
    });
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await prisma.client.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
