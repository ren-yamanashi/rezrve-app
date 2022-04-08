import { styled } from "@mui/system";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { blue } from "@mui/material/colors";

const TabListComponent = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[400]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
export default TabListComponent;
