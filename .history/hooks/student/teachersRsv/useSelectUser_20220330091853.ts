import { atom,useRecoilState, useResetRecoilState } from 'recoil'
import {
	collection,
	getFirestore,
	doc,
	getDoc,
  } from "firebase/firestore";
  import { Users } from "../../../models/Users";
  import { useAuth } from '../../useUserAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type Query = {
	id: string;
};
const initialUser:Users = null 
export const userState = atom({
	key:"user",
	default:initialUser
});

export function useSelectUser() {
	const {user} = useAuth();
	const [tch,setTch] = useRecoilState(userState);
    const router = useRouter();
    const query_ = router.query as Query;
	function getCollections () {
		const db = getFirestore();
			return {
				db,
				userCollection: collection(db, "users"),
			};
	};
	async function loadSelectUser(props) {
		if (props.queryId === undefined) {
			return;
		};
		const { userCollection } = getCollections();
		const userDoc = await getDoc(doc(userCollection, props.queryId));
		if (!userDoc.exists()) {
			return;
		};
		const gotUser = userDoc.data() as Users;
		gotUser.id = userDoc.id;
		setTch(gotUser);
	};
	return {tch,loadSelectUser}
};


