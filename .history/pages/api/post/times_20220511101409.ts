
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';

// published : true

// Create Todo
export default async function handle(req, res) {
  const userId = req.query.id;
  const {timeArr} = req.body;
  console.log(timeArr)
  const result = await prisma.time.create({
    data: {
      number:timeArr,
      author: { connect: {id:"test"} },
    },
  });
  res.json(result);
}
