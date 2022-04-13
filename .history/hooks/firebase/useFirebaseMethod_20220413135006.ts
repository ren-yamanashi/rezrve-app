import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	QuerySnapshot,
	DocumentData,
} from "firebase/firestore";

export const db = getFirestore();

export const baseQuery_Other = () => {
	return query( collection(db,"other") )
};
export const baseLoading_Other = (snapshot:QuerySnapshot<DocumentData>,number) => {
}