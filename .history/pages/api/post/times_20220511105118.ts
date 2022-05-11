
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';
import Router from 'next/router';

// published : true

// Create Todo
export default async function handle(req, res) {
const {companyId } = req.body;
  const result = await prisma.time.create({
    data: {
      number:2,
      author: { connect: { id:companyId } },
    },
  });
  res.json(result);
  
}
