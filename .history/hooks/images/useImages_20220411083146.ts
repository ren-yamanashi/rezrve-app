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
export const dataState2 = atom({
	key:"data2",
	default:initialData
})
export const dataState3 = atom({
	key:"data3",
	default:initialData
})
export const errorState = atom({
	key:"error",
	default:initialError
})
export function useHomePageImage() {
	const db = getFirestore();
	const {user} = useAuth();
	const [data_firstView,setData_firstView] = useRecoilState(dataState);
	const [data_introduction,setData_introduction] = useRecoilState(dataState2);
	const [data_pageTransition,setData_pageTransition] = useRecoilState(dataState3);
	function baseQuery() {
		return query(
			collection(db,"other")
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotData = snapshot.docs.map((doc) => {
			const data = doc.data() as Other
			data.id = doc.id;
			return data 
		})
		setData_firstView(gotData);
		setData_introduction(gotData);
		setData_pageTransition(gotData);
	}
	return {baseQuery,baseLoading,data_firstView,data_introduction,data_pageTransition,setData_firstView,setData_introduction,setData_pageTransition}
}