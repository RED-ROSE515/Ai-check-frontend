"use client";
import React, { useState } from "react";
import MultipleSelector, { Option } from "@/components/Multipleselect";
import api from "@/utils/api";
import { useAnalyze } from "@/contexts/AnalyzeContext";

export interface UserProfile {
  about_me: string;
  avatar: string | null;
  city: string;
  country: string;
  degree: any[]; // You might want to define a specific type for degree
  first_name: string;
  gender: number;
  id: string;
  is_active: boolean;
  is_blocked: boolean;
  is_follower: boolean;
  is_following: boolean;
  is_reported: boolean;
  is_suspended: boolean;
  joined_at: string;
  middle_name: string;
  noble_id: string;
  second_name: string;
  user_name: string;
  wallpaper: string;
}

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise(async (resolve) => {
    const response = await api.get(`user/members?name=${value}`);
    const result = response.data.map((user: UserProfile) => ({
      ...user,
      label: user.first_name + " " + user.second_name,
      value: "@" + user.user_name,
    }));
    resolve(result);
  });
};

const UserSearchBar = ({ disabled, setUsers, users }: any) => {
  return (
    <div className="flex w-full flex-col">
      <MultipleSelector
        onSearch={mockSearch}
        disabled={disabled}
        value={users}
        onChange={(val: any) => setUsers(val)}
        defaultOptions={[]}
        groupBy="group"
        placeholder="Search specific users to add."
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
            loading...
          </p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            No users found.
          </p>
        }
      />
    </div>
  );
};

export default UserSearchBar;
