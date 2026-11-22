"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@components/tailgrids/core/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuSection,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/tailgrids/core/dropdown";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const UserAvatar = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log("user", data.user);
      setUser(data.user);
    };
    fetchUser();
  }, [supabase]);
  const handleLogout = async () => {
    await logout();
    redirect("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar size="sm" className="bg-red-300">
          <AvatarImage
            src="path/to/image.jpg"
            alt="Profile picture of Random Person"
          />
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge status="online" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSection>
          <DropdownMenuHeader>Account</DropdownMenuHeader>
          <DropdownMenuItem onAction={() => console.log("Edit")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onAction={() => console.log("Duplicate")}>
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuSection>
        <DropdownMenuSeparator />
        <DropdownMenuSection>
          <DropdownMenuItem
            className={"text-red-700 hover:text-red-800"}
            onAction={handleLogout}
          >
            <RiLogoutCircleLine />
            Logout
          </DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
