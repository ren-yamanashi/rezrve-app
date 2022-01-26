//外部インポート
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect,useState } from 'react'
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

//userState の方定義
export const reserveState = atom<FreeList | null>({
	key:'reserve',
	default:null,
})

export function useReserve() {
	//ステートに保管されているユーザーデータ
	const db = getFirestore();
	const [reserves,setReserves] = useState<FreeList[]>([]);
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
