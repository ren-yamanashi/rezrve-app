//外部インポート
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
  } from "firebase/firestore";
//内部インポート
import { User } from '../models/User';

//userState の方定義
export const userState = atom<User | null>({
	key:'user',
	default:null,
})

async function CreateUser(user:User) {
	const db = getFirestore();
	const usersCollection = collection(db,"users")
	const userRef = doc(usersCollection,user.uid)
	await setDoc(userRef,{
		userName:user.displayName,
		email:user.email,
		id:user.uid,
	})
}

export function useAuth() {
	//ステートに保管されているユーザーデータ
	const [user,setUser] = useRecoilState(userState);
	
	
    //useEffectでサイレンンダリングを防止
	useEffect(() => {
		if(user !== null) {
			return
		}
		const auth = getAuth()
		signInAnonymously(auth).catch(function (error) {
			console.error(error)
		})
		//認証終了後...
		onAuthStateChanged(auth,function(firebaseUser) {
			if(firebaseUser) {
				/**ユーザー情報をセット */
				setUser({
					uid:firebaseUser.uid,
					displayName:firebaseUser.displayName,
					email:firebaseUser.email,
				})
			}else{
				//サインアウトしたら...
				setUser(null)
			}
		})
	},[])
	return {user}
}
