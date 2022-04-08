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
const initialUser : FreeList[] = []
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

export function useUsersList() {
	const [usersList,setUsersList] = useRecoilState(userState);
	async function loadUsers() {
		const q = query((
			collection(db,"FreeSpace")
		))
		const snapshot = await getDocs(q);
		const gotUser = snapshot.docs.map((doc) => {
			const user = doc.data() as FreeList;
			user.id = doc.id;
			return user;
		});
		setUsersList(gotUser)
	}
	return{loadUsers}
}