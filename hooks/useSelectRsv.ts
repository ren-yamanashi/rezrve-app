import { AnyARecord } from "dns";
import { useCallback,useState } from "react";

import { FreeList } from "../models/FreeList";

type Props = {
	id:string;
	freeLists:Array<FreeList>;
	onOpen: () => void;
}

export const useSelectRsv = () => {
	const [selectedRsv,setSelectedRsv] = useState<FreeList | null>(null);
	const onSelectRsv = useCallback((props:Props) => {
		const {id,freeLists,onOpen} = props;
		const targetRsv = freeLists.find((rsv:any) => rsv.id === id);
		setSelectedRsv(targetRsv!);
		onOpen() 
	},[])
	return{onSelectRsv,selectedRsv}
}