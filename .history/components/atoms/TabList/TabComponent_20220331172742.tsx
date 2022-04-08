import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { blue } from "@mui/material/colors";
// Create Tab
export const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[300]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
interface TabProps {
  children?: React.ReactNode;
}

export default function TabComponent(props: TabProps) {
  return (
    <>
      <Tab
        sx={{
          borderStyle: "solid",
          fontSize: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.children}
      </Tab>
    </>
  );
}
