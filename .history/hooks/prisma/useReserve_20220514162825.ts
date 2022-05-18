import * as React from "react";
import Router from "next/router";
export const usePrismaReserve =  () => {
    const createShift = async(e: React.SyntheticEvent,data) => {
      e.preventDefault();
      await fetch("/api/post/reserves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("シフト登録")
    };
    const updateReserve = async (id:string,data):Promise<void> => {
      await fetch(`/api/reserve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("予約登録");
	  Router.reload()
    };
    const chancelReserve = async (id:string):Promise<void> => {
      await fetch(`api/reserved/${id}`,{
        method:"PUT",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify(id),
      })
      console.log("予約キャンセル");
      Router.reload()
    }
    return {createShift,updateReserve,chancelReserve}
}