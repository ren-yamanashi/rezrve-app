import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	QuerySnapshot,
	DocumentData,
} from "firebase/firestore";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../alert/useAlert";
import { Other } from "../../models/other";

const initialData :Other[] = [];
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
const db = getFirestore();
export function useImages() {
	const {user} = useAuth();
	const [data_firstView,setData_firstView] = useRecoilState(dataState);
	const [data_introduction,setData_introduction] = useRecoilState(dataState2);
	const [data_pageTransition,setData_pageTransition] = useRecoilState(dataState3);
	function baseQuery() {
		return query(
			collection(db,"other")
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>,number) {
		const gotData = snapshot.docs.map((doc) => {
			const data = doc.data() as Other
			data.id = doc.id;
			return data 
		})
		number == 0 && setData_firstView(gotData);
		number == 1 && setData_introduction(gotData);
		number == 2 && setData_pageTransition(gotData);
	}
	return {baseQuery,baseLoading,data_firstView,data_introduction,data_pageTransition,}
}

export function useData() {
	const {showErrorMessage} = useAlert();
	const {baseQuery,baseLoading,data_firstView,data_introduction,data_pageTransition} = useImages()
	async function loadData_FirstView() {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("pageNumber","==",0)));
			baseLoading(snapshot,0);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	async function loadData_Introduction() {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("pageNumber","==",1)));
			baseLoading(snapshot,1);
		} catch (error) {
			console.log(error)
			showErrorMessage("読み取りに失敗しました");
		}
	}
	async function loadData_PageTransition() {
		
		try {
			const snapshot = await getDocs(query(baseQuery(),where("pageNumber","==",2)));
			baseLoading(snapshot,2);
		} catch (error) {
			console.log(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	React.useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  loadData_FirstView();
		  loadData_Introduction();
		  loadData_PageTransition();
	},[process.browser])
	return {data_firstView,data_introduction,data_pageTransition}
}