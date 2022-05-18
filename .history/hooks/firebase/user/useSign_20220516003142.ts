import {
	createUserWithEmailAndPassword,
	getAuth,
	signOut,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth";
import { useRouter } from 'next/router';
import { useAlert } from '../../useAlert';

/** =======================
 * @returns サインアウト
 * =======================*/
export const useSignOut = () => {
	const auth = getAuth();
	const {showErrorMessage} = useAlert();
	const loadSingOut = async () => {
		try {
			await signOut(auth);
		} catch(error) {
			showErrorMessage("ログアウトに失敗しました");
			console.error(error);
		}
	}
	return {loadSingOut}
};
/** ========================
 * @returns 新規登録
 * ========================*/
export const useJoin = () => {
	const auth = getAuth();
	const {showErrorMessage,showSuccessMessage} = useAlert();
	const joinCompony = async (e,email,password,password2) => {
		e.preventDefault();
		if( password == password2) {
			try {
				await createUserWithEmailAndPassword(auth,email,password);
				showSuccessMessage("登録しました");		
			} catch {
				showErrorMessage("情報の登録に失敗しました");
			}
		} else {
			showErrorMessage("確認用パスワードに誤りがあります")
		}
	}
	return {joinCompony}
}
/** ========================
 * @returns ログイン
 * ========================*/
export const useLogin = () => {
	const auth = getAuth();
	const router = useRouter();
	const {showErrorMessage,showSuccessMessage} = useAlert();
	/** 店舗ログイン（ログイン画面からのログイン） */
	const loginStore = async(e,email,password,load?) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth,email,password);
			showSuccessMessage("ログインしました");
			onAuthStateChanged(auth,(user) => {
				// スタッフ登録では画面遷移が起きないようにする
				if(user.displayName !== null ) {
					router.push(`/${user?.displayName}/home/`)
				} 
			});
		} catch (error) {
			showErrorMessage("ログインに失敗しました");
		} 
	}
	/** スタッフログイン（ログイン画面からのログイン） */
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
					router.push(`/staff/home/${user?.uid}/`);
				} else {
					showErrorMessage("ページの読み取りに失敗しました。もう一度ログインしてください");
				}
			})
		}
	}
	return {loadLoginUser,loginStore}
}
/** ========================
 * @returns パスワード再発行
 * ========================*/
export const useResetPassword = () => {
	const auth = getAuth();
	const {showErrorMessage,showSuccessMessage} = useAlert();
	const loadResetPassword = async (e,email) => {
		e.preventDefault();
		try {
			await sendPasswordResetEmail(auth,email)
			showSuccessMessage("メールを送信しました")
		} catch(error) {
			showErrorMessage("読み取りに失敗しました");
			console.error(error);
		}
	}
	return {loadResetPassword}
}