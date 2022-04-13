import { Timestamp } from "firebase/firestore";

export const useTimestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};