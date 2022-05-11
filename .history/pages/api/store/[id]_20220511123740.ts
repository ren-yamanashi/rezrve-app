import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const userId = req.query.id;
  const { id,userName,address } = req.body;
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