import * as React from "react";

export const useCreateStoreTimes = () => {
	const createTimes = async (e: React.SyntheticEvent,routerId,times) => {
		e.preventDefault();
		const timeData = { routerId:routerId, times:times };
		try {
			await fetch("/api/post/times", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(timeData),
			});
			console.log("営業時間登録")
		} catch (error) {
			console.error(error)
		}
		
	};
	return {createTimes}
}
