import prisma from "../../../lib/prisma";

export default async function handle(req,res) {
	const {email,password,password2,id,error} = req.body
	const result = await prisma.user.create({
		data: {
			email:email,
			companyId:id,
		},
	});
	res.json(result)
}