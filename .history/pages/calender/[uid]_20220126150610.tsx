import dynamic from "next/dynamic";

const FullCalendar = dynamic(
  () => import("../../components/organisms/calender/calender"),
  {
    ssr: false,
  }
);

const SomePage = () => {
  return <FullCalendar />;
};

export default SomePage;
