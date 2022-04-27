import {
	createUserWithEmailAndPassword,
	getAuth,
	signOut,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth";
import * as firebaseAuth from "firebase/auth"
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useAuth } from '../useUserAuth';
import { useRouter } from 'next/router';
import { db } from '../useFirebase';
import { useAlert } from '../../useAlert';






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
/** =========== < サインアウト > ============ */
export const useSignOut = () => {
	const auth = getAuth();
	const {showErrorMessage,showSuccessMessage} = useAlert();
	const loadSingOut = async (e) => {
		e.preventDefault();
		try {
			await signOut(auth);
		} catch(error) {
			showErrorMessage("ログアウトに失敗しました");
			console.error(error);
		}
	}
	return {loadSingOut}
};
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
			load == true ? router.push(`/${user?.displayName}/staffs`) : router.push(`/add/${id}/`)
		} catch (error) {
			showErrorMessage("読み取りに失敗しました");
		}
	}
	/** 店舗ログイン（ログイン画面からのログイン） */
	const loginStore = async(e,email,password) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth,email,password);
			showSuccessMessage("ログインしました");
		} catch (error) {
			showErrorMessage("ログインに失敗しました");
		} finally {
			onAuthStateChanged(auth,(user) => {
				if(user) {
					router.push(`/${user?.displayName}/home/`)
				} else {
					showErrorMessage("ページの読み取りに失敗しました。もう一度ログインしてください");
				}
			});
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
	const loadLoginUser = async(event,email,password) =>{
		event.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			showSuccessMessage("ログインに成功しました");
		} catch (error) {
			showErrorMessage("ログインに失敗しました")
			console.error(error);
		} finally {
			onAuthStateChanged(auth,(user) => {
				if(user) {
					router.push('/staff/home/');
				} else {
					showErrorMessage("ページの読み取りに失敗しました。もう一度ログインしてください");
				}
			})
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
	return {loadLoginUser,loadResetPassword}
}
