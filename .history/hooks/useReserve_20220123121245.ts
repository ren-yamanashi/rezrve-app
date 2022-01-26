//外部インポート
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	query,
	getDocs,
  } from "firebase/firestore";
//内部インポート
import { FreeList } from '../models/FreeList'; 
import { freemem } from 'os';



export function useReserve() {
	//ステートに保管されているユーザーデータ
	const db = getFirestore();
	const [reserves,setReserves] = useRecoilState<FreeList[]>(null);
    //useEffectでサイレンンダリングを防止
	useEffect(() => {
		if(reserves !== null) {
			return
		}
		const auth = getAuth();
		async function loadReserves() {
			const q = query(
				collection(db,"FreeSpace")
			)
			const snapshot = await getDocs(q);
			if(snapshot.empty) {
				return
			}
			const gotFreeList = snapshot.docs.map((doc) => {
				const free = doc.data() as FreeList;
				free.id = doc.id;
				return free;
			  });
			setReserves(gotFreeList)
		}loadReserves()
	},[])
	return {reserves}
}
