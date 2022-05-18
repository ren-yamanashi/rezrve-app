import prisma from '../../../lib/prisma';

const handle = async (req, res) => {
  const userId = req.query.id;
  const { id,userName,address,role } = req.body;
  const post = await prisma.user.update({
    where: { id: userId },
    data: { 
      id : id,
      userName:userName,
      address:address,
      role:role,
    },
  });
  res.json(post);
}

export default handle