

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Save user message
    const userMessage = await prisma.message.create({
      data: { content: message, role: 'user' },
    });

    // Simple bot response (can integrate AI later)
    const botReply = `You said: "${message}"`;

    // Save bot message
    const botMessage = await prisma.message.create({
      data: { content: botReply, role: 'bot' },
    });

    res.status(200).json({ userMessage, botMessage });
  } else {
    res.status(405).end();
  }
}
