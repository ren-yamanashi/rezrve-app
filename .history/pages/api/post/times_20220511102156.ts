
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';

// published : true

// Create Todo
export default async function handle(req, res) {
  const userId = req.query.id;
  const {time} = req.body;
  const result = await prisma.time.create({
    data: {
      number:[1,2,3,4,5,6,7,8,9,10],
      author: { connect: {id:"test"} },
    },
  });
  res.json(result);
}
