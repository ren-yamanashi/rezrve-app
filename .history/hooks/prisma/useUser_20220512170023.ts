import * as React from "react";
import { userProps } from "../../models/userProps";

export const useCreateUser = async (e: React.SyntheticEvent,data:userProps) => {
    e.preventDefault();
    await fetch("/api/post/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("ユーザー作成")
  };

export const useUpdateUser = async (id:string,data):Promise<void> => {
  await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log("ユーザー更新");
}