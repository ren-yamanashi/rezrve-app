import { atom, useRecoilState } from "recoil";
import * as React from "react";
const initialLoading: boolean = true;
export const loadingState = atom({
  key: "loading",
  default: initialLoading,
});
export function useLoading() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const handleChange = () => setLoading(!loading);
  return { handleChange, loading };
}
