import prisma from '../../../lib/prisma';

const handle = async (req, res) => {
  const userId = req.query.id;
  const { id,userName,address,role,url } = req.body;
  const post = await prisma.user.update({
    where: { id: userId },
    data: { 
      id : id,
      userName:userName,
      address:address,
      role:role,
      staffImageUrl:url
    },
  });
  res.json(post);
}

export default handle