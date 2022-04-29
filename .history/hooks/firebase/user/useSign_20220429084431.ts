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

/** =========== < サインアウト > ============ */
export const useSignOut = () => {
	const auth = getAuth();
	const {showErrorMessage} = useAlert();
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
	const {showErrorMessage,showSuccessMessage} = useAlert();
	const joinCompony = async (e,email,password,password2,id?) => {
		e.preventDefault();
		if( password == password2) {
			try {
				await createUserWithEmailAndPassword(auth,email,password);
				showSuccessMessage("ログインしました");
				router.push(`/add/${id}/`)				
			} catch {
				showErrorMessage("情報の登録に失敗しました");
			}
		} else {
			showErrorMessage("確認用パスワードに誤りがあります")
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
	return {joinCompony,loginStore}
}

/**========= < スタッフログイン > =========*/
export const useLogin = () => {
	const auth = getAuth();
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