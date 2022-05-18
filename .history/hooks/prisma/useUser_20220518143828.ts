import * as React from "react";
import { userProps } from "../../models/userProps";
import {useAlert} from "../useAlert"

export const usePrismaUser =  () => {
  const {showSuccessMessage,showErrorMessage} = useAlert()
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
      await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("ユーザー更新");
    };
    const createStaff = async (e: React.SyntheticEvent,data:any) => {
      e.preventDefault();
      await fetch("/api/post/staffs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    const deleteStaff = async (e:any,id:string) => {
      e.preventDefault();
      await fetch(`api/staff/${id}`, {
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      })
    }
    return {createUser,updateUser,createStaff,deleteStaff}
}