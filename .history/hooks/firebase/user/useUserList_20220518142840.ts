import * as React from 'react'
import {
	doc,
	getDoc,
	query,
	where,
	getDocs,
	QuerySnapshot,
	DocumentData,
	deleteDoc,
	collection,
} from "firebase/firestore";
import { Users } from '../../../models/Users';
import { useAuth } from '../useUserAuth';
import { db } from '../useFirebase';
import { useAlert } from '../../useAlert';
import { useRouter } from 'next/router';
import {useLoading} from "../../useLoading"
import { Query } from '../../../models/router_query';
/**============ < 基盤作成 > ==========*/
export const useUsers = () => {
	const [usersList,setUsersList] = React.useState<Users[]>([])
	const baseQuery = (pageQuery) => {
		return query (
			collection(db,"users"),
			where("companyId","==",pageQuery)
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotUsers = snapshot.docs.map((doc) => {
			const users = doc.data() as Users
			users.id = doc.id
			return users
 		})
		 setUsersList(gotUsers)
	}
	return {baseQuery,baseLoading,usersList,}
 }
/** ======= < queryId == userId（生徒以外） > ========*/
export const useSelectUser_query = () => {
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	const [user_query,setUser_query] = React.useState<Users>(null);
	const userCollection = collection(db,"users");
	const loadUser_query = async (queryId) => {
		if(queryId == undefined) {
			return;
		}
		try {
			const userDoc = await getDoc(doc(userCollection,queryId));
		if(!userDoc.exists()) {
			return;
		}
		const gotUser = userDoc.data() as Users;
		gotUser.id == userDoc.id;
		setUser_query(gotUser);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	React.useEffect(() => {
		if (user === null) {
			return;
		}
		loadUser_query(user?.uid);
	},[user])
	return {user_query,loadUser_query}
}
