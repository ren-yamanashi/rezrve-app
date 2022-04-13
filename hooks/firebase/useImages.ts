import { atom, useRecoilState } from "recoil";
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
import { useAuth } from "./useUserAuth";
import { useAlert } from "../useAlert";
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
export const useImages = () => {
	const {user} = useAuth();
	const [data_firstView,setData_firstView] = useRecoilState(dataState);
	const [data_introduction,setData_introduction] = useRecoilState(dataState2);
	const [data_pageTransition,setData_pageTransition] = useRecoilState(dataState3);
	const baseQuery = () => {
		return query(
			collection(db,"other")
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>,number) => {
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

export const useData = () => {
	const {showErrorMessage} = useAlert();
	const {baseQuery,baseLoading,data_firstView,data_introduction,data_pageTransition} = useImages()
	const loadData_FirstView = async () => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("pageNumber","==",0)));
			baseLoading(snapshot,0);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	const loadData_Introduction = async () => {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("pageNumber","==",1)));
			baseLoading(snapshot,1);
		} catch (error) {
			console.log(error)
			showErrorMessage("読み取りに失敗しました");
		}
	}
	const loadData_PageTransition = async() => {
		
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