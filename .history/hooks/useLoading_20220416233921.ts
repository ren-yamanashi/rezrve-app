import * as React from "react";
import { atom, useRecoilState } from "recoil";

const loadingState = atom({
	key:"loading",
	default:false,
})
export const useLoading = () => {
	const [loading,setLoading] = useRecoilState(loadingState);
	const StartLoading = () => {setLoading(true)}
	const CompleteLoading = () => {setLoading(false)}
	return {loading,StartLoading,CompleteLoading};
} 