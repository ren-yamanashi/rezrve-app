import * as React from "react";

export const useCreateStoreTimes = () => {
	const createTimes = async (e: React.SyntheticEvent,routerId,times) => {
		e.preventDefault();
		const timeData = { routerId:routerId, times:times };
		await fetch("/api/post/times", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(timeData),
		});
	};
	return {createTimes}
}
