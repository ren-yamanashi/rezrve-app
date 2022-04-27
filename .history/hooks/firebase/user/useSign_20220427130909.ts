import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {
	doc,
	getDoc,
	collection,
	setDoc,
} from "firebase/firestore";

import { Users } from '../../../models/Users';
import {User} from "../../../models/User"
import { useAuth } from '../useUserAuth';
import { useRouter } from 'next/router';
import { db } from '../useFirebase';
import { useAlert } from '../../useAlert';

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
	const loadSingUp = async(event,email,password,load?,password2?) =>{
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

/** ========== 新規登録 ============*/
export const useJoin = () => {
	const auth = getAuth();
	const router = useRouter();
	const {user} = useAuth();
	const {showErrorMessage,showSuccessMessage} = useAlert();
	/** 新規店舗登録 */
	const joinCompony = async (e,email,password,password2,id) => {
		e.preventDefault();
		if( password == password2) {
			try {
				await createUserWithEmailAndPassword(auth,email,password);				
			} catch {
				showErrorMessage("読み取りに失敗しました");
			}
		} else {
			showErrorMessage("確認用パスワードに誤りがあります")
		}
	}
	/** 店舗ログイン(初回登録時) */
	const loginCompony = async(e,email,password,id,load?:boolean) => {
		e.preventDefault();
		try {
			const companyCollection = collection(db,"company")
			const userRef = doc(companyCollection,user.uid)
			const document = await getDoc(userRef)
			if(document.exists()) {
				return
			}
			await signInWithEmailAndPassword(auth,email,password);
			setDoc(userRef,{
				id,
				email,
			});
			showSuccessMessage("登録しました");
			load == true ? router.push(`/${user.displayName}/staffs`) : router.push(`/add/${id}/`)
		} catch (error) {
			showErrorMessage("読み取りに失敗しました");
		}
	}
	/** 店舗ログイン（ログイン画面からのログイン） */
	const loginStore = async(e,email,password) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth,email,password)
			showSuccessMessage("ログインしました");
			setTimeout(() => router.push(`/${user.displayName}/staffs/`),500) 
		} catch (error) {
			showErrorMessage("ログインに失敗しました");
		}
	}
	return {joinCompony,loginCompony,loginStore}
}

/**========= < スタッフログイン > =========*/
export const useLogin = () => {
	const auth = getAuth();
	const {user} = useAuth();
	const router = useRouter();
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const [loginUserError,setLoginUserError] = useRecoilState(loginUserErrorState)
	const loadLoginUser = async(event,email,password) =>{
		event.preventDefault();
		setLoginUserError(false);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			showSuccessMessage("ログインに成功しました");
			router.push('/staff/home/');
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
