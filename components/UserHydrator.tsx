"use client";

import { useUserStore } from "@/store/user.store";
import { UserDTO } from "@/types";
import { useEffect } from "react";

const UserHydrator = ({ user }: { user: UserDTO }) => {
	const setUser = useUserStore((store) => store.setUser);

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	return null;
};

export default UserHydrator;
