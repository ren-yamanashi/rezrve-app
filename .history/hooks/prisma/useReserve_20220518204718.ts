import * as React from "react";
import Router from "next/router";
import { useAlert } from "../useAlert";
import { useAuth } from "../firebase/useUserAuth";

export const usePrismaReserve =  () => {
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const {user} = useAuth()
    //シフト登録
    const createShift = async(e: React.SyntheticEvent,data) => {
      e.preventDefault();
      if(user !== undefined ) {
        showErrorMessage("ログインしてください")
      } else {
        try {
          await fetch("/api/post/reserves", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          showSuccessMessage("シフトを登録しました")
          console.log("シフト登録")
        } catch (error) {
          console.error(error)
          showErrorMessage("シフト登録に失敗しました")
        }
      }
      
      
    };
    //予約登録
    const updateReserve = async (id:string,data):Promise<void> => {
      try {
        await fetch(`/api/reserve/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        showSuccessMessage("予約を登録しました")
        console.log("予約登録");
        Router.reload()
      } catch (error) {
        console.error(error)
        showErrorMessage("予約登録に失敗しました")
      }
      
    };
    //予約キャンセル
    const chancelReserve = async (id:string):Promise<void> => {
      try {
        await fetch(`/api/reserved/${id}`,{
          method:"PUT",
          headers:{ "Content-Type": "application/json" },
          body: JSON.stringify(id),
        })
        showSuccessMessage("予約をキャンセルしました")
        console.log("予約キャンセル");
        Router.reload()
      } catch (error) {
        console.error(error);
        showErrorMessage("予約キャンセルに失敗しました")
      }
      
    }
    //シフト削除
    const deleteShifts = async (id:string):Promise<void> => {
      try {
        await fetch(`/api/shift/${id}`,{
          method: "DELETE",
          headers:{ "Content-Type": "application/json" },
          body: JSON.stringify(id),
        });
        showSuccessMessage("シフトを削除しました")
        console.log("シフト削除")
        Router.reload();
      } catch (error) {
        showErrorMessage("シフト削除に失敗しました")
        console.error(error)
      }
    }
    return {createShift,updateReserve,chancelReserve,deleteShifts}
}