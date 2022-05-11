import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import * as React from 'react'

// import my File
import { User } from '../../models/User';
// Create State Model
export const userState = atom<User | null>({
	key:'user',
	default:null,
})

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
					// CreateUserIfNotFound(loginUser)
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
