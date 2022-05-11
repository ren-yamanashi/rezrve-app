import prisma from '../../../lib/prisma';

// create User
export default async function handle(req, res) {
  const { email,password,password2,id,error,userId } = req.body;
  const result = await prisma.user.create({
    data: {
      id:userId,
      companyId:id,
      email:email,
    },
  });
  res.json(result);
}
