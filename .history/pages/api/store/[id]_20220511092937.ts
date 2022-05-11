import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;
  const { id,userName,address,times } = req.body;
  const post = await prisma.user.update({
    where: { id: postId },
    data: { 
      id : id,
      userName:userName,
      address:address,
    },
  });
  res.json(post);
}