import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	query,
	startAt,
	endAt,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	limit,
  } from "firebase/firestore";
//import in File 
import { Users } from '../../models/Users';
import {User} from "../../models/User"
import { useAuth } from '../useUserAuth';
//create state use atom
const initialFreeSpace : Users[] = []
const initialUsers : Users = null
const initialUser : User = null
const initialError : boolean = false
export const SpaceState = atom({
	key:"users",
	default:initialFreeSpace,
})
export const userState = atom({
	key:"user",
	default:initialUser,
})
export const studentsState = atom({
	key:"students",
	default:initialFreeSpace
})
export const userQueryState = atom({
	key:"user_query",
	default:initialUsers,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
// getFireStore 
const db = getFirestore()

export function useUsers() {
	const [usersList,setUsersList] = useRecoilState(SpaceState)
	const [studentsList,setStudentsList] = useRecoilState(studentsState)
	function baseQuery() {
		return query (
			collection(db,"users"),
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		 setUsersList(gotUsers)
	}
	function baseLoading_student (snapshot:QuerySnapshot<DocumentData>) {
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		setStudentsList(gotUsers)
	}
	return {baseQuery,baseLoading,baseLoading_student,usersList,studentsList}
 }
 /**==============================
  * @returns student limit8 Next
  *=============================*/
  export function useStudentsList() {
	const {baseQuery,baseLoading_student,studentsList} = useUsers();
	const {user} = useAuth();
	async function loadUsers() {
		const snapshot = await getDocs(query(baseQuery(),where("role","==","student"),limit(8)));
		if(snapshot.empty) {
			return
		}
		baseLoading_student(snapshot)
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadUsers();
	  }, [process.browser, user]);
	return {loadUsers,studentsList}
}
 /**==============================
  * @returns student limit8
  *===============================*/
export function useUserList() {
	const {baseQuery,baseLoading,usersList} = useUsers();
	const {user} = useAuth();
	async function loadUsers() {
		const snapshot = await getDocs(query(baseQuery(),where("role","==","student"),limit(8)));
		if(snapshot.empty) {
			return
		}
		baseLoading(snapshot)
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadUsers();
	  }, [process.browser, user]);
	return {loadUsers,usersList}
}
/**==============================
 * @returns search studentName
 *=============================*/
export function useSearchStudent() {
	const {baseLoading,baseQuery,usersList} = useUsers();
	
	async function loadSearchStudent(student) {
		const snapshot = await getDocs(query(
			baseQuery(),
			where("role","==","student"),
			orderBy("userName"),
			startAt(student),
			endAt(student + "\uf8ff")
		));
		if(snapshot.empty) {
			return
		}
		baseLoading(snapshot)
	}
	return{loadSearchStudent,usersList}
}
/**======================
 * @returns teacher
 *=====================*/
export function useTeacherList() {
	const {user} = useAuth();
	const {baseLoading,baseQuery,usersList} = useUsers();
	async function  loadTeachersList() {
		const snapshot = await getDocs(query(baseQuery(),where("role","==","teacher")))
		baseLoading(snapshot)
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		if(user === null) {
			return;
		}
		loadTeachersList()
	}, [process.browser, user])
	return{ usersList }
}
/**=====================
 * @returns selectUser
 *=====================*/
export function useSelectUser() {
	const {user} = useAuth()
	const {baseQuery,baseLoading,usersList} = useUsers();
	async function loadSelectUsers(id) {
		const snapshot = await getDocs(query(baseQuery(),where("id","==",id)))
		baseLoading(snapshot);
	}
	return {loadSelectUsers,usersList}
}
/**==============================
 * @returns id = userId
 *==============================*/
export function useTeacher() {
	const {baseLoading,baseQuery,usersList} = useUsers();
	const [userName,setUserName] = useRecoilState(userState)
	const {user} = useAuth();
	async function loadTeacher() {
		const snapshot = await getDocs(query(baseQuery(),where("id","==",user.uid)));
		if(snapshot.empty) {
			return
		}
		baseLoading(snapshot);
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		setUserName(user);
		loadTeacher();
	}, [process.browser, user]);
	return {usersList,userName,loadTeacher}
}
/**=======================
 * queryId == userId
 *======================*/
export function useSelectUser_query() {
	const {user} = useAuth();
	const [user_query,setUser_query] = useRecoilState(userQueryState);
	const db = getFirestore();
	const userCollection = collection(db,"users");
	async function loadUser_query(queryId) {
		if(queryId == undefined) {
			return
		}
		const userDoc = await getDoc(doc(userCollection,queryId));
		if(!userDoc.exists()) {
			return
		}
		const gotUser = userDoc.data() as Users;
		gotUser.id == userDoc.id;
		setUser_query(gotUser);
	}
	return {user_query,loadUser_query}
}