import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
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
	setDoc,
} from "firebase/firestore";

import { Users } from '../../../models/Users';
import { useAuth } from '../useUserAuth';
import { db } from '../useFirebase';
import { useAlert } from '../../useAlert';

const initialFreeSpace : Users[] = []
const initialUsers : Users = null
export const SpaceState = atom({
	key:"users",
	default:initialFreeSpace,
})
export const studentsState = atom({
	key:"students",
	default:initialFreeSpace
})
export const userQueryState = atom({
	key:"user_query",
	default:initialUsers,
})

/**============ < 基盤作成 > ==========*/
export const useUsers = () => {
	const [usersList,setUsersList] = useRecoilState(SpaceState)
	const [studentsList,setStudentsList] = useRecoilState(studentsState)
	const baseQuery = () => {
		return query (
			collection(db,"users"),
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		 setUsersList(gotUsers)
	}
	const baseLoading_student = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		setStudentsList(gotUsers)
	}
	return {baseQuery,baseLoading,baseLoading_student,usersList,studentsList}
 }
/**========= < 講師 > ===========*/
export const useStaffList = () => {
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	const {baseLoading,baseQuery,usersList} = useUsers();
	 const  loadStaffList = async() => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("role","==","staff"),where("companyId","==",user.displayName)));
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	const deleteTeacher = async(e:any,id:string) => {
		e.stopPropagation();
		try {
			await deleteDoc(doc(db, "users", id)).then(() => loadStaffList())
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		if(user === null) {
			return;
		}
		loadStaffList()
	}, [process.browser, user])
	return{ usersList,deleteTeacher,loadStaffList }
}
export const useStaffList_queryId = () => {
	const {baseLoading,baseQuery,usersList} = useUsers();
	const {showErrorMessage} = useAlert();
	const loadStaffList_query = async (queryId) => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("role","==","staff"),where("companyId","==",queryId)));
			baseLoading(snapshot);
		} catch (error) {
			console.error(error);
		}
	}
	return {loadStaffList_query,usersList}
}
/**======== < ユーザー選択 > ==========*/
export const useSelectUser = () => {
	const {baseQuery,baseLoading,usersList} = useUsers();
	const {showErrorMessage} = useAlert()
	const loadSelectUsers = async(id) =>  {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("id","==",id)))
			baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
		
	}
	return {loadSelectUsers,usersList}
}

/** ======= < queryId == userId > ========*/
export const useSelectUser_query = () => {
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	const [user_query,setUser_query] = useRecoilState(userQueryState);
	const userCollection = collection(db,"users");
	const loadUser_query = async (queryId) => {
		if(queryId == undefined) {
			return
		}
		try {
			const userDoc = await getDoc(doc(userCollection,queryId));
		if(!userDoc.exists()) {
			return
		}
		const gotUser = userDoc.data() as Users;
		gotUser.id == userDoc.id;
		setUser_query(gotUser);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	return {user_query,loadUser_query}
}