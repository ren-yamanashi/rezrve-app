import prisma from '../../../lib/prisma';

// create User
const handle = async (req, res) => {
  const { email,password,password2,id,companyId,name,staffImageUrl } = req.body;
  const result = await prisma.user.create({
    data: {
      companyId:companyId,
      email:email,
      role:"staff",
      userName:name,
      staffImageUrl:staffImageUrl,
    },
  });
  res.json(result);
}

export default handle