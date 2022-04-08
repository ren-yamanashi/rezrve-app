import { atom, useRecoilState } from "recoil";
import * as React from "react";
const initialLoading: boolean = true;
export const loadingState = atom({
  key: "loading",
  default: initialLoading,
});
export function useLoading() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const loadingFalse = () => setLoading(false);
  const loadingTrue = () => setLoading(true);
  return { loadingFalse, loadingTrue, loading };
}
