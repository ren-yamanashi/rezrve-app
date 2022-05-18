
import prisma from '../../../lib/prisma';
// Create Times
const handle = async (req, res) => {
const {routerId,times} = req.body;
  const result = await prisma.time.create({
    data: {
      companyId:routerId,
      number:times,
    },
  });
  res.json(result);
  
}

export default handle 