import * as React from "react";
import { userProps } from "../../models/userProps";
import {useAlert} from "../useAlert"
import {useAuth} from "../firebase/useUserAuth"
export const usePrismaUser =  () => {
  const {showSuccessMessage,showErrorMessage} = useAlert()
  const {user} = useAuth()
    const createUser = async(e: React.SyntheticEvent,data:userProps) => {
      e.preventDefault();
      try {
        await fetch("/api/post/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        console.log("ユーザー作成")
      } catch (error) {
        console.error(error)
      }
    };
    const updateUser = async (id:string,data):Promise<void> => {
      try {
        await fetch(`/api/user/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        console.log("ユーザー更新");
      } catch (error) {
        console.error(error)
      }
    };
    const createStaff = async (e: React.SyntheticEvent,data:any) => {
      e.preventDefault();
      if (user ==undefined) {
        showErrorMessage("ログインしてください")
      } else {
        try {
          await fetch("/api/post/staffs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          console.log("スタッフ登録")
        } catch (error) {
          console.error(error);
        }
      }
    }
    const deleteStaff = async (e:any,id:string) => {
      e.preventDefault();
      if (user == undefined) {
        showErrorMessage("ログインしてください")
      } else {
        try {
          await fetch(`api/staff/${id}`, {
            method:"DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id),
          })
          showSuccessMessage("スタッフを削除しました")
          console.log("スタッフ削除")
        } catch (error) {
          console.error(error)
          showErrorMessage("スタッフ削除に失敗しました")
        }
      }
      
    }
    return {createUser,updateUser,createStaff,deleteStaff}
}