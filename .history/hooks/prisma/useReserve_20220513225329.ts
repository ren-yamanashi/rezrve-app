import * as React from "react";

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
    const updateUser = async (id:string,data):Promise<void> => {
      await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("ユーザー更新");
    };
    return {createShift,updateUser}
}