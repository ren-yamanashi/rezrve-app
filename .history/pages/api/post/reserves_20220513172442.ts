import prisma from '../../../lib/prisma';

// create User
export default async function handle(req, res) {
  const { companyId,date,time,staffName,userId } = req.body;
  const result = await prisma.reserve.create({
    data: {
      companyId:companyId,
	  staff:staffName,
	  date:date,
      time:12,
      senderUid:userId
    },
  });
  res.json(result);
}
