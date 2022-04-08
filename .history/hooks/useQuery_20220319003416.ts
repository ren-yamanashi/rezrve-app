import * as React from "react";
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
  } from "firebase/firestore";
import {useAuth} from "./useUserAuth"

// Create Today setTime 12:00
const newDate = new Date();
const y = newDate.getFullYear();
const m = newDate.getMonth();
const d = newDate.getDate();
const today = new Date(y, m, d, 12, 0, 0);
const timestamp = (datetimeStr: any) => {
	return Timestamp.fromDate(new Date(datetimeStr));
};

export function CreateQuery() {
	const db = getFirestore();
	const {user} = useAuth()
	const qer = query(
		collection(db, "FreeSpace"),
		where("senderUid", "==", user.uid),
		where("reserved", "==", true),
		where("date", "==",timestamp(today) ),
		orderBy("time", "asc")
	);
	return(qer)
}