import { Timestamp } from "firebase/firestore";

export const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};