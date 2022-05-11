import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;
  const { userId,userName,address,error } = req.body;
  const post = await prisma.user.update({
    where: { id: postId },
    data: { 
      id : userId,
      userName:userName,
      address:address,
    },
  });
  res.json(post);
}