import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const  {id}  = req.body;
  const post = await prisma.reserve.update({
    where: { id: id },
    data: { 
      reserved:false,
      reserver:"",
      email:"",
	  phoneNumber:null,
      reserverUid:"",
    },
  });
  res.json(post);
}