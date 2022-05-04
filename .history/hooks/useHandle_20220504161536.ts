import * as React from "react"

export const useHandle = () => {
	const [open,setOpen] = React.useState({open1:false,open2:false,open3:false,open4:false,open5:false,open6:false,open7:false});
	const handleOpen1 = () => setOpen({...open,open1:true})
	const handleOpen2 = () => setOpen({...open,open1:true})
	const handleOpen3 = () => setOpen({...open,open1:true})
	const handleOpen4 = () => setOpen({...open,open1:true})
	const handleClose1 = () => setOpen({...open,open1:false})
	const handleClose2 = () => setOpen({...open,open1:false})
	const handleClose3 = () => setOpen({...open,open1:false})
	const handleClose4 = () => setOpen({...open,open1:false})
	return{handleClose1,handleClose2,handleClose3,handleClose4,handleOpen1,handleOpen2,handleOpen3,handleOpen4}
}