//外部インポート
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	setDoc,
	query,
  } from "firebase/firestore";
//内部インポート
import {FreeList} from "../models/FreeList";
import { browser } from 'process';
import { useAuth } from './useUserAuth';

export function TeacherShift() {
	//ステートに保管されているユーザーデータ
	const [shiftLists,setShiftLists] = useState<FreeList[]>();
	const {user} = useAuth();
    //useEffectでサイレンンダリングを防止
	useEffect(() => {
		if(!process.browser) {
			return
		}
		if (user === null) {
			return;
		}
		async function loadShift() {
			const db =getFirestore();
			const q = query(collection(db, "FreeSpace"));
			const snapshot = await getDocs(q);
			if(snapshot.empty) {
				return
			}
			const gotShift = snapshot.docs.map((doc) => {
				const shift = doc.data() as FreeList
				shift.id = doc.id
				return shift
			});
			setShiftLists(gotShift);
		}
		loadShift()
	},[process,browser,user])
	return {shiftLists}
}
