import { useCallback,useState } from "react";

import { FreeList } from "../models/FreeList";

type Props = {
	id:string;
	rsv:Array<FreeList>;
	onOpen: () => void;
}

export const useSelectRsv = () => {
	const [selectedRsv,setSelectedRsv] = useState<FreeList | null>(null);
	const onSelectRsv = useCallback((props:Props) => {
		const {id,rsv,onOpen} = props;
		const targetRsv = rsv.find((rsv) => rsv.id === id);
		setSelectedRsv(targetRsv!);
		onOpen() 
	},[])
	return{onSelectRsv,setSelectedRsv}
}