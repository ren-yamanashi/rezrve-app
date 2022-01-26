//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, useCallback } from "react";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { User } from "../../models/User";
import { ReserveList } from "../../models/ReserveList";
import Header from "../../components/templates/Header";
//queryの方を準備
type Query = {
  uid: string;
};

export function addFixedReserve() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;
  //フォームの入力内容をステートに保管
  const { user: currentUser } = useAuth();
  const [course, setCourse] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [DayOfWeekNumber, setDayOfWeekNumber] = useState<number>();
  const [more, setMore] = useState<string | null>(null);
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [time, setTime] = useState("");
  const [weekNumber, setWeekNumber] = useState<number>();
  const [completed, setCompleted] = useState<boolean>(false);
  const [sendeing, setSending] = useState<boolean>(false);
  //日付をTimeStampになおす
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
  });
}
