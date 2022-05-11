
import prisma from '../../../lib/prisma';
// Create Times
export default async function handle(req, res) {
const {routerId,times} = req.body;
  const result = await prisma.time.create({
    data: {
	  companyId:routerId,
      number:times,
    },
  });
  res.json(result);
  
}
