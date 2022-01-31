import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FullCalendar from "@fullcalendar/react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  ButtonGroup,
} from "@chakra-ui/react";
import Link from "next/link";

// The import order DOES MATTER here. If you change it, you'll get an error!

export default function Home() {
  return (
    <div>
      <div className="text-center">
        <Flex align="center" justify="center" height="100vh">
          <Box w="sm" p={4} borderRadius="md" shadow="md">
            <Heading
              as="h1"
              size="lg"
              textAlign="center"
              fontWeight="extrabold"
              fontFamily="revert"
            >
              My Todo List
            </Heading>
            <p>ここはTodoリストを管理できるサービスです。</p>
            <Box>
              <Link href="user/signup">Todoリストを作成しよう!</Link>
            </Box>
            <br />
            <Box mt={1}>
              <Link href="user/login">アカウントをお持ちの方はこちら</Link>
            </Box>
          </Box>
        </Flex>
      </div>
    </div>
  );
}
