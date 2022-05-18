import prisma from '../../../lib/prisma';

// シフト削除
export default async function handle(req, res) {
	const  id  = req.body;
  if (req.method === 'DELETE') {
    const post = await prisma.reserve.delete({
      where: { id: id },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}