import prisma from "../../../lib/prisma";

export default async function handle(req,res) {
	const {email,password,password2,id} = req.body
	const result = await prisma.user.create({
		data: {
			email:email,
			userName:id,
		},
	});
	res.json(result)
}