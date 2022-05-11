import prisma from '../../../lib/prisma';

// create User
export default async function handle(req, res) {
  const { email,password,password2,id,error } = req.body;
  const result = await prisma.user.create({
    data: {
      companyId:id,
      email:email,
    },
  });
  res.json(result);
}
