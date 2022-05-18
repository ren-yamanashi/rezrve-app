import prisma from '../../../lib/prisma';

// create Reserves
 const handle = async (req, res) => {
  const { companyId,date,time,staffName,userId } = req.body;
  const result = await prisma.reserve.create({
    data: {
      companyId:companyId,
      staff:staffName,
      date:date,
      time:time,
      senderUid:userId
    },
  });
  res.json(result);
}
export default handle