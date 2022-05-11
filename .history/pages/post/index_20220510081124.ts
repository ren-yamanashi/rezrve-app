import prisma from "../../lib/prisma";

export default async function handle(req,res) {
	const {email,password,password2} = req.body
	const result = await prisma.user.create({
		data: {
			email:email,
		},
	});
	res.json(result)
}