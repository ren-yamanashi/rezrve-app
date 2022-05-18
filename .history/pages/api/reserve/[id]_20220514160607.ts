import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const userId = req.query.id;
  const { id,reserver,email,phoneNumber,reserverUid } = req.body;
  const post = await prisma.reserve.update({
    where: { id: id },
    data: { 
      reserved:true,
      reserver:reserver,
      email:email,
	  phoneNumber:phoneNumber,
      reserverUid:reserverUid
    },
  });
  res.json(post);
}