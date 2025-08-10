const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role || 'user',
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
