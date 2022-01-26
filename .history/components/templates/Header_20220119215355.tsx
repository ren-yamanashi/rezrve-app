import React, { useState } from "react";
import Link from "next/link";

import { User } from "../../models/User";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<User>();
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
}
