//外部インポート
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const login =async (email:string,password:string) => {
	const auth = getAuth();
	const result = await signInWithEmailAndPassword(auth,email,password);
	const id = await result.user.getIdToken();
	await fetch("/user/login",{method:"POST",body:JSON.stringify({id})})
}
export const signIn =async (email:string,password:string) => {
	const auth = getAuth();
	const result = await createUserWithEmailAndPassword(auth,email,password);
}