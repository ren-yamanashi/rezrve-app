
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';

// published : true

// Create Todo
export default async function handle(req, res) {
	const userId = req.query.id;
  const {number} = req.body;
  const result = await prisma.time.create({
    data: {
      number:number,
      author: { connect: { id:userId  } },
    },
  });
  res.json(result);
}
