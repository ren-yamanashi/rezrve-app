//外部インポート
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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

/**========
 * Userの作成
 *=======*/
async function CreateUser(user: User) {
	const db = getFirestore();
	const usersCollection = collection(db,'users') //users　というデータベースを指定
	const userRef = doc(usersCollection,user.uid) 
	await setDoc(userRef,{
		name:"ユーザー１",
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
		const auth = getAuth();
		//認証終了後...
		onAuthStateChanged(auth,function(firebaseUser) {
			if(firebaseUser) {
				/**ユーザー情報をセット */
				const loginUser:User = {
					uid:firebaseUser.uid,
					isAnonymous:firebaseUser.isAnonymous,
				}
				setUser(loginUser)
				CreateUser(loginUser)
			}else{
				setUser(null)
			}
		})
	},[])
	return {user}
}
