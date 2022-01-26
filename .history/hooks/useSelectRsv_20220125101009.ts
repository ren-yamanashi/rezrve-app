import { useCallback,useState } from "react";

import { FreeList } from "../models/FreeList";

type Props = {
	id:string;
	reserves:Array<FreeList>;
	onOpen: () => void;
}

export const useSelectRsv = () => {
	const [selectedRsv,setSelectedRsv] = useState<FreeList | null>(null);
	const onSelectRsv = useCallback((props:Props) => {
		const {id,reserves,onOpen} = props;
		const targetRsv = reserves.find((rsv) => rsv.id === id);
		setSelectedRsv(targetRsv!);
		onOpen() 
	},[])
	return{onSelectRsv,selectedRsv}
}