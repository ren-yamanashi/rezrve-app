import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import * as React from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
// import my File
import { User } from '../../models/User';
import { useAlert } from '../useAlert';
// Create State Model
export const userState = atom<User | null>({
	key:'user',
	default:null,
})

// Create User
const CreateUserIfNotFound = async(user:User) => {
	const db = getFirestore();
	const {showErrorMessage} = useAlert()
	const usersCollection = collection(db,"users")
	const userRef = doc(usersCollection,user.uid)
	const document = await getDoc(userRef)
	if(document.exists()) {
		return
	}
	try {
		await setDoc(userRef,{
			userName:user.displayName,
			email:user.email,
			id:user.uid,
		});
		console.log("ユーザー認証"); //テスト用
	}catch(error){
		console.error(error);
		showErrorMessage("読み取りに失敗しました")
	}
}

export const useAuth = () => {
	const [user,setUser] = useRecoilState(userState);
	// const {showErrorMessage} = useAlert()
	React.useEffect(() => {
		if(user !== null) {
			return
		}
		const auth = getAuth()
		//認証終了後...
		try {
			onAuthStateChanged(auth,function(firebaseUser) {
				if(firebaseUser) {
					const loginUser:User = {
						uid:firebaseUser.uid,
						displayName:firebaseUser.displayName,
						email:firebaseUser.email,
						photoURL:firebaseUser.photoURL
					}
					setUser(loginUser)
					CreateUserIfNotFound(loginUser)
				}else{
					setUser(null)
				}
			})
		} catch (error) {
			console.error(error);
		}
	},[user])
	return {user}
}
