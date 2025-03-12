import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useSearch } from "@/contexts/SearchContext";
import { usePagination } from "@/contexts/PaginationContext";
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from "next-themes";

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});
  const { setKeyword, keyword } = useSearch();
  const { setPage } = usePagination();
  const { theme } = useTheme();
  const router = useRouter();
  const getHashtags = async (newValue: string) => {
    const response = await api.get(`papers/keywords?q=${newValue}`);
    const results = response.data;
    setData(results.hashtags);
  };
  const handleInputChange = useDebouncedCallback(async (newValue: string) => {
    // Don't make API call if the search value is empty
    if (!newValue.trim()) {
      // getHashtags("");
      return;
    }

    // Check if we have cached results (including failed attempts)
    // if (cache[newValue] !== undefined) {
    //   setData(cache[newValue] || []); // Use empty array if cache value is null
    //   return;
    // }

    try {
      getHashtags(newValue);
      // setCache((prev) => ({ ...prev, [newValue]: results.hashtags }));
    } catch (error) {
      console.error(error);
      // Cache the failed attempt with null to prevent repeated calls
      setData([]); // Set empty array for failed requests
    }
  }, 500);

  useEffect(() => {
    handleInputChange("");
  }, []);

  return (
    <div>
      <Autocomplete
        className="w-full"
        aria-label="Search by keyword."
        classNames={{
          base: "min-w-[45vw] h-[36px]",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        items={data}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: `border-none h-[36px] ${theme === "dark" ? "bg-[#2E3D4C] text-[#798FA6]" : "bg-[#EBEBEB] text-[#828489]"}`,
          },
        }}
        selectedKey={searchValue}
        onInputChange={(val: string) => {
          handleInputChange(val);
        }}
        onSelectionChange={(id) => {
          const hashtag = data.filter((hash) => hash.id === id)?.[0];
          setSearchValue(id);

          if (hashtag) {
            setKeyword(hashtag?.hashtag_name);
            setPage(1);
            router.push("/");
          }
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        placeholder="Search what you want ..."
        popoverProps={{
          offset: 10,
          classNames: {
            base: "rounded-large",
            content: "p-1 border-small border-default-100 bg-background",
          },
        }}
        radius="full"
        startContent={
          <SearchIcon
            className="text-default-400"
            size={20}
            strokeWidth={2.5}
          />
        }
        variant="bordered"
      >
        {(item) => (
          <AutocompleteItem key={item.id} textValue={item.hashtag_name}>
            <div className="flex justify-between items-center">
              <span className="text-small">{item.hashtag_name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchBar;
