import { getFirestore, Timestamp } from "firebase/firestore";

export const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};

export const db = getFirestore();