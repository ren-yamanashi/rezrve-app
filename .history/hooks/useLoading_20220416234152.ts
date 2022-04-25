import * as React from "react";
import { atom, useRecoilState } from "recoil";

const loadingState = atom({
	key:"loading",
	default:true,
})
export const useLoading = () => {
	const [loading,setLoading] = useRecoilState(loadingState);
	const completeLoading = () => {setLoading(false)}
	return {loading,completeLoading};
} 