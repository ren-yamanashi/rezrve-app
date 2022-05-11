import prisma from '../../../lib/prisma';

// 下書 → 公開
export default async function handle(req, res) {
  const postId = req.query.id;
  const { userName, url,address } = req.body;
  const post = await prisma.user.update({
    where: { id: postId },
    data: { 
      userName:userName,
      address:address,
      storeImageUrl:url,
    },
  });
  res.json(post);
}