import { FreeSpace } from "../../../components/organisms/FreeSpace";

export default function SpacePage() {
  const freeLists = FreeSpace();
  console.log(freeLists);
  return (
    <>
      <FreeSpace />
    </>
  );
}
