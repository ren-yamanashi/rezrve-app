import prisma from '../../../lib/prisma';

// create User
const handle = async (req, res) => {
  const { email,password,password2,id,companyId } = req.body;
  const result = await prisma.user.create({
    data: {
      id:companyId,
      companyId:companyId,
      email:email,
      role:"company",
    },
  });
  res.json(result);
}

export default handle