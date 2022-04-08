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
interface QueryProps {
	children?: React.ReactNode;
  }
interface QueryProps2 {
	children2?: React.ReactNode;
}
export function CreateQuery(props: QueryProps,props2:QueryProps2) {
	const db = getFirestore();
	const q = query(
		collection(db, "FreeSpace"),
		where("senderUid", "==", props.children),
		where("reserved", "==", true),
		where("date", "==", props2.children2),
		orderBy("time", "asc")
	  );
	  return(q)
}