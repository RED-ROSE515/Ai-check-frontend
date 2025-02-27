import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { ImSearch } from "react-icons/im";
import api from "@/utils/api";
import { useSearch } from "@/contexts/SearchContext";

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
const hashtags = [
  {
    id: "2fea340d-e2d9-48b3-98b7-c2ae177ed389",
    hashtag_name: "breakdown voltage",
  },
  {
    id: "28a333df-a325-4d84-be7c-81a628d48fe5",
    hashtag_name: "edge termination",
  },
  {
    id: "ce6c167e-46fb-4fbe-b36d-e7474cbf84ba",
    hashtag_name: "JTE",
  },
  {
    id: "2a834594-9f63-4f3c-8100-69cb33b291d5",
    hashtag_name: "OBIC",
  },
  {
    id: "484ccfc7-7c28-4e1a-8a5a-3aeb1c186bcc",
    hashtag_name: "Adsorption–desorption isotherms",
  },
];
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<any[]>(hashtags);
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});
  const { setKeyword, keyword } = useSearch();

  // API call with caching
  const handleAPICall = async () => {
    if (cache[searchValue]) {
      setData(cache[searchValue]);
      return;
    }
    try {
      const response = await api.get(`papers/keywords?q=${searchValue}`);

      const results = response.data;
      setData(results.hashtags);
      setCache((prev) => ({ ...prev, [searchValue]: results.hashtags }));
    } catch (error) {
      console.error(error);
    }
  };

  // Debounce API call
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAPICall();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <div>
      <Autocomplete
        aria-label="Search by keyword."
        classNames={{
          base: "max-w-xs",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        defaultItems={data}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: "h-[48px]",
          },
        }}
        onInputChange={(value) => setSearchValue(value)}
        onSelectionChange={(id) => {
          const hashtag = data.filter((hash) => hash.id === id)[0];
          setKeyword(hashtag?.hashtag_name);
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
        placeholder="Search what you want."
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
              {/* <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                    <span className="text-tiny text-default-400">
                      {item.team}
                    </span>
                  </div>
                </div>
                <Button
                  className="border-small mr-0.5 font-medium shadow-small"
                  radius="full"
                  size="sm"
                  variant="bordered"
                >
                  Add
                </Button> */}
              <span className="text-small">{item.hashtag_name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchBar;
