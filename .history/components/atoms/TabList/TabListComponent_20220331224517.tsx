import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
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
