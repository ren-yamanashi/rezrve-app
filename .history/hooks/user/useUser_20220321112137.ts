//import notIn File
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	limit,
  } from "firebase/firestore";
//import in File 
import { User } from '../../models/User';
import { FreeList } from '../../models/FreeList';
import { useAuth } from '../useUserAuth';
import {CreateQuery} from '../useQuery';
import { browser } from 'process';
import { Users } from '../../models/Users';

//create state use atom
const initialUser : Users[] = []
const initialError : boolean = false
export const userState = atom({
	key:"user",
	default:initialUser,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
// getFireStore 
const db = getFirestore()

/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useUser() {
	const [usersList,setUsersList] = useRecoilState(userState)
	/**====================
	 * @returns Create Base Query
	 *====================*/
	function baseQuery() {
		return query (
			collection(db, "users"),
			where("role", "==", "student"),
		)
	}
	/**=====================
	 * * @returns Create Base Loading
	 *====================*/
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotUsers = snapshot.docs.map((doc) => {
			const us = doc.data() as Users
			us.id = doc.id
			return us
		})
		setUsersList(gotUsers)
	}
	return {baseQuery,baseLoading,usersList}
}
/**==================================
 * @returns role == student
 *==================================*/
export function useUsersList() {
	const {baseQuery,baseLoading,usersList} = useUser();
	const [error2,setError2] = useRecoilState(errState)
	async function loadUsers() {
		const snapshot = await getDocs(query(
			baseQuery(),
            limit(6)))
		if (snapshot.empty) {
			setError2(true);
		}
		baseLoading(snapshot)
		setError2(false);
	}
	return {usersList,error2,loadUsers}
}