
import prisma from '../../../lib/prisma';
import { useAuth } from '../../../hooks/firebase/useUserAuth';
import Router from 'next/router';

// published : true

// Create Todo
export default async function handle(req, res) {
  const userId = Router.query;
  if (userId == undefined) {
	  console.log("tesuto")
  }
  const result = await prisma.time.create({
    data: {
      number:2,
      author: { connect: { id:userId } },
    },
  });
  res.json(result);
  
}
