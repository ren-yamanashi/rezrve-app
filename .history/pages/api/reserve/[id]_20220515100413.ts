import prisma from '../../../lib/prisma';

//予約登録
const handle = async (req, res) => {
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

export default handle