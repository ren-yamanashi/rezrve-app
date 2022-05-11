import prisma from '../../../lib/prisma';

// create User
export default async function handle(req, res) {
  const { email,password,password2,id,companyId } = req.body;
  const result = await prisma.user.create({
    data: {
      companyId:companyId,
      email:email,
      role:"staff",
    },
  });
  res.json(result);
}
