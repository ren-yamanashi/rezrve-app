import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	updateProfile,
  } from "firebase/auth";
import {
	getFirestore,
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
//import in File 
import { Users } from '../../models/Users';
import {User} from "../../models/User"
import { useAuth } from '../useUserAuth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
//create state use atom
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
const db = getFirestore()

/**===================
 * @returns SignUp 
 *===================*/
export function useSignUp() {
	const auth = getAuth()
	const [loginUser,setLoginUser] = useRecoilState(loginUserState)
	const [loginError,setLoginError] = useRecoilState(loginErrorState)
	async function loadSingUp (event,email,password,load) {
		event.preventDefault();
		setLoginError(false)
		await createUserWithEmailAndPassword(auth, email, password)
		.then(() => load)
		.catch((error) => {
			setLoginError(true)
			console.error(error)
		})
		await updateProfile(auth.currentUser, {
			displayName: loginUser,
		}).then(() => {
			setLoginUser("");
		});
	}
	return {loadSingUp,loginError,loginUser}
}
/**=====================
 * @returns Login
 *=====================*/
export function useLogin() {
	const auth = getAuth()
	const {user} = useAuth()
	const router = useRouter()
	const usersCollection = collection(db, "users");
	const [loginUserError,setLoginUserError] = useRecoilState(loginUserErrorState)
	async function loadLoginUser(event,email,password,load) {
		event.preventDefault();
		setLoginUserError(false);
		const userRef = doc(usersCollection,user &&  user.uid);
		await updateDoc(userRef, {
			role: "teacher",
		});
		await signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			{
			  if (user.displayName == undefined) {
				router.push(`/user/profile/${user?.uid}`);
				updateDoc(userRef, {
				  role: "teacher",
				});
			  } else {
				load
			  }
			}
		  })
		  .catch((error) => {
			setLoginUserError(true);
			console.error(error);
		  });
	}
	// reset password
	async function loadResetPassword (event,email) {
		event.preventDefault();
		sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("メールを送信しました", {
            position: "bottom-left",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      })
      .catch((error) => {
        setLoginUserError(true)
        console.log(error);
      });
	}
	return {loginUserError,loadLoginUser,loadResetPassword}
}
/**======================
 * Create Base
 *======================*/
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
  * @returns student limit8  & searchStudent
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
	async function loadSearchStudentsList(student) {
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
	async function deleteTeacher(e:any,id:string) {
		e.stopPropagation();
		await deleteDoc(doc(db, "users", id)).then(() => loadTeachersList())
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

/**=====================
 * @returns selectUser
 *=====================*/
export function useSelectUser() {
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
/**=====================
 *  id == userId 
 *====================*/
export function useUser() {
	const {baseQuery} = useUsers()
	const [user_id,setUser_id] = useRecoilState(userState_id)
	const {user} = useAuth()
	async function loadUser() {
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