import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	query,
	startAt,
	endAt,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	limit,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";

import { Users } from '../../../models/Users';
import {User} from "../../../models/User"
import { useAuth } from '../useUserAuth';
import { useRouter } from 'next/router';
import { db } from '../useFirebase';
import { useAlert } from '../../alert/useAlert';

const initialFreeSpace : Users[] = []
const initialLoginUser : string = ""
const initialUsers : Users = null
const initialUser : User = null
const initialError : boolean = false
export const loginUserState = atom({
	key:"loginUser",
	default:initialLoginUser,
})
export const SpaceState = atom({
	key:"users",
	default:initialFreeSpace,
})
export const userState_id = atom({
	key:"user_id",
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
export const loginErrorState = atom({
	key:"loginError",
	default:initialError,
})
export const loginUserErrorState = atom({
	key:"loginUserError",
	default:initialError,
})
export const loadUserErrorState = atom({
	key:"loadUserError",
	default:initialError,
})

/**========　<　新規登録　>　=====*/
export const useSignUp = () =>{
	const auth = getAuth()
	const router = useRouter()
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const loadSingUp = async(event,email,password,load?) =>{
		event.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			showSuccessMessage("登録しました");
			router.push(load);
		} catch (error) {
			showErrorMessage("ユーザーの読み取りに失敗しました")
		}
	}
	return {loadSingUp}
}
/**========= < ログイン > =========*/
export const useLogin = () => {
	const auth = getAuth()
	const {user} = useAuth()
	const router = useRouter()
	const usersCollection = collection(db, "users");
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const [loginUserError,setLoginUserError] = useRecoilState(loginUserErrorState)
	const loadLoginUser = async(event,email,password,load,role) =>{
		event.preventDefault();
		setLoginUserError(false);
		const userRef = doc(usersCollection,user &&  user.uid);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			showSuccessMessage("ログインに成功しました");
			router.push(load);
			//ログイン履歴の有無をユーザ名で表現
			if (user.displayName == undefined) {
				updateDoc(userRef, {
				  role: role,
				}).then(() => router.push(`/user/profile/${user.uid}`))
			}
		
		} catch (error) {
			showErrorMessage("ログインに失敗しました")
			console.error(error);
		}
	}
	// reset password
	const loadResetPassword = async (event,email) => {
		event.preventDefault();
		try {
			await sendPasswordResetEmail(auth, email)
			showSuccessMessage("メールを送信しました")
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
        console.log(error);
		}
	}
	return {loginUserError,loadLoginUser,loadResetPassword}
}

/**============ < 基盤作成 > ==========*/
export const useUsers = () => {
	const [usersList,setUsersList] = useRecoilState(SpaceState)
	const [loadUserError,setLoadUserError] = useRecoilState(loadUserErrorState)
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
	return {baseQuery,baseLoading,baseLoading_student,usersList,studentsList,loadUserError,setLoadUserError}
 }

 /** ========= < 生徒(最大8件)　&  生徒名検索 （基本管理者ページで使用）> =========== */
  export const useStudentsList = () => {
	const {baseQuery,baseLoading_student,studentsList} = useUsers();
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	const loadUsers = async() => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("role","==","student"),limit(8)));
			if(snapshot.empty) {
				return
			}
			baseLoading_student(snapshot)
		} catch (error) {
			console.error(error)
			showErrorMessage("読み取りに失敗しました")
		}
		
	}
	const loadSearchStudentsList = async(student) => {
		try {
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
			baseLoading_student(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
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
	return {loadUsers,studentsList,loadSearchStudentsList}
}
 /**============ < 生徒（最大8人）（基本講師ページで使用）> =============*/
export const  useUserList = () => {
	const {baseQuery,baseLoading,usersList} = useUsers();
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	const loadUsers = async() =>  {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("role","==","student"),limit(8)));
		if(snapshot.empty) {
			return
		}
		baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
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
/**======　< 生徒名検索 >　=======*/
export const useSearchStudent = () => {
	const {baseLoading,baseQuery,usersList} = useUsers();
	const {showErrorMessage} = useAlert()
	const loadSearchStudent = async(student)  => {
		try {
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
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return{loadSearchStudent,usersList,}
}

/**========= < 講師 > ===========*/
export const useTeacherList = () => {
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	const {baseLoading,baseQuery,usersList} = useUsers();
	 const  loadTeachersList = async() => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("role","==","teacher")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	const deleteTeacher = async(e:any,id:string) => {
		e.stopPropagation();
		try {
			await deleteDoc(doc(db, "users", id)).then(() => loadTeachersList())
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
		loadTeachersList()
	}, [process.browser, user])
	return{ usersList,deleteTeacher }
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
/**========= < id = userId > ========*/
export const useTeacher = () => {
	const {baseLoading,baseQuery,usersList} = useUsers();
	const [userName,setUserName] = useRecoilState(userState)
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	const loadTeacher = async() => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("id","==",user.uid)));
		if(snapshot.empty) {
			return
		}
		baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
		
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

/** ======= < queryId == userId > ========*/
export const useSelectUser_query = () => {
	const {showErrorMessage} = useAlert()
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

/**=======< id = userId >=====*/
export const useUser = () => {
	const {baseQuery} = useUsers()
	const [user_id,setUser_id] = useRecoilState(userState_id)
	const {user} = useAuth()
	const loadUser = async() => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("id","==",user.uid)));
		if(snapshot.empty) {
			return
		}
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		 setUser_id(gotUsers)
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  if (user === null) {
			return;
		}
		loadUser()
	},[process.browser, user])
	return {loadUser,user_id}
}