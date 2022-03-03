import UsersList from "../../components/organisms/user/UserList";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <UsersList />
        </Box>
      </Header>
    </>
  );
}
