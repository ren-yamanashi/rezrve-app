import * as React from "react";

export const useLoading = () => {
	const [loading,setLoading] = React.useState(false);
	const startLoading = () => {setLoading(true)}
	const completeLoading = () => {setLoading(false)}
	return {loading,startLoading,completeLoading};
} 