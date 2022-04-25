import * as React from "react";
import { atom, useRecoilState } from "recoil";

const loadingState = atom({
	key:"loading",
	default:false,
})
export const useLoading = () => {
	const [loading,setLoading] = useRecoilState(loadingState);
	const startLoading = () => {setLoading(true)}
	const completeLoading = () => {setLoading(false)}
	return {loading,startLoading,completeLoading};
} 