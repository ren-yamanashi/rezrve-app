import { atom,useRecoilState } from 'recoil'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import * as React from "react";
import {
	doc,
	getDoc,
	query,
	startAt,
	endAt,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	limit,
	deleteDoc,
	updateDoc,
	collection,
	serverTimestamp,
	setDoc,
	addDoc,
} from "firebase/firestore";

import { Users } from '../../../models/Users';
import {User} from "../../../models/User"
import { useAuth } from '../useUserAuth';
import { useRouter } from 'next/router';
import { db } from '../useFirebase';
import { useAlert } from '../../useAlert';

export const useSelectStore = () => {
	const [store,setStore] = React.useState<Users>();
	const [times,setTimes] = React.useState<number[]>([])
	const userCollection = collection(db,"users");
	const {user} = useAuth()
	const selectStore = async(id) => {
		if(id == undefined) {
			return
		}
		try {
			const userDoc = await getDoc(doc(userCollection,id))
			if(!userDoc.exists()) {
				return
			}
			const gotUser = userDoc.data() as Users;
			gotUser.id == userDoc.id;
			setStore(gotUser);
		} catch (error) {
			console.log(error);
		}
	}
	React.useEffect(() => {
		if (!process.browser) {
			return;
		}
		selectStore(user?.uid);
		setTimes(store.times);
	},[process.browser]);
	return {selectStore,store,times}
}