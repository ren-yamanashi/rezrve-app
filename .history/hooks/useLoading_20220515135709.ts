import * as React from "react";
import { atom, useRecoilState } from "recoil";

const loadingState = atom({
	key:"loading",
	default:true,
})
export const useLoading = () => {
	const [loading,setLoading] = React.useState(true);
	const startLoading = () => {setLoading(true)}
	const completeLoading = () => {setLoading(false)}
	return {loading,startLoading,completeLoading};
} 