import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import {
	getFirestore,
	collection,
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
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../alert/useAlert";
import { Other } from "../../models/other";

const initialData :Other[] = [];
const initialError :boolean = false
export const dataState = atom({
	key:"data",
	default:initialData
})
export const errorState = atom({
	key:"error",
	default:initialError
})
export function useHomePageImage() {
	const db = getFirestore();
	const {user} = useAuth();
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotData = snapshot.docs.map((doc) => {
			const data = doc.data() as Other
			data.id = doc.id;
			return data 
		})
	}
}