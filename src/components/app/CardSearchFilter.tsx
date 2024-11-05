"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { inputStyles } from "@/components/ui/input";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Filter {
  name: string;
  value: string;
}

interface FilterOption {
  name: string;
  type: "free" | "limited";
  options?: string[];
}

const availableFilters: FilterOption[] = [
  { name: "name", type: "free" },
  {
    name: "type",
    type: "limited",
    options: ["action", "character", "item", "location"],
  },
  {
    name: "color",
    type: "limited",
    options: ["amber", "amethyst", "emerald", "ruby", "sapphire", "steel"],
  },
];

interface CustomFilterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  autoFocus?: boolean;
}

const placeholder = "Type a filter (e.g., name:value)";

export function useFilterUrlUpdater(filters: Filter[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (filters: Filter[]) => {
      const params = new URLSearchParams(searchParams);

      Array.from(params.keys()).forEach((key) => {
        params.delete(key);
      });

      filters
        .filter((filter) => ["type", "color"].includes(filter.name))
        .forEach((filter) => {
          params.set(filter.name, filter.value);
        });

      return params.toString();
    },
    [searchParams, filters],
  );

  useEffect(() => {
    const newQueryString = createQueryString(filters);

    if (newQueryString !== searchParams.toString()) {
      // @ts-expect-error - Next types are wrong this should be a shallow object
      router.push(`${pathname}?${newQueryString}`, { shallow: true });
    }
  }, [JSON.stringify(filters)]);
}

export function CardSearchFilter({
  autoFocus = false,
  className,
}: CustomFilterInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useLocalStorage<Filter[]>(
    "cardSearchFilters",
    [],
  );
  useFilterUrlUpdater(filters);
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const activeFilterNames = filters.map((f) => f.name);

  useEffect(() => {
    const parts = input.split(":");
    if (parts.length === 1) {
      setSuggestions(
        availableFilters
          .map((f) => f.name)
          .filter((suggestion) => !activeFilterNames.includes(suggestion))
          .filter((f) => f.startsWith(parts[0].toLowerCase())),
      );
      setActiveFilter(null);
    } else if (parts.length === 2) {
      const filterOption = availableFilters.find(
        (f) => f.name === parts[0].toLowerCase(),
      );
      setActiveFilter(filterOption || null);
      if (filterOption?.type === "limited") {
        setSuggestions(
          filterOption.options?.filter((o) =>
            o.startsWith(parts[1].toLowerCase()),
          ) || [],
        );
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setActiveFilter(null);
    }
    setActiveSuggestionIndex(-1);
  }, [input, JSON.stringify(activeFilterNames)]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (activeSuggestionIndex !== -1) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        } else if (input.includes(":")) {
          const [name, value] = input.split(":");
          const filterOption = availableFilters.find(
            (f) => f.name === name.toLowerCase(),
          );
          if (filterOption) {
            if (
              filterOption.type === "free" ||
              (filterOption.type === "limited" &&
                filterOption.options?.includes(value.trim().toLowerCase()))
            ) {
              setFilters([
                ...filters,
                { name: name.toLowerCase(), value: value.trim() },
              ]);
              setInput("");
            }
          }
        }
        break;
      case "Backspace":
        if (input === "" && filters.length > 0) {
          const newFilters = [...filters];
          newFilters.pop();
          setFilters(newFilters);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : -1,
        );
        break;
      case "Escape":
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (activeFilter) {
      setInput(`${activeFilter.name}:${suggestion}`);
      setFilters([...filters, { name: activeFilter.name, value: suggestion }]);
      setInput("");
    } else {
      setInput(`${suggestion}:`);
    }
    inputRef.current?.focus();
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  };

  useEffect(() => {
    if (suggestionsRef.current && activeSuggestionIndex !== -1) {
      const activeElement = suggestionsRef.current.children[
        activeSuggestionIndex
      ] as HTMLElement;
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeSuggestionIndex]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for suggestion clicks
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <SSRCardSearchFilterFallback
      className={className}
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      handleInputChange={handleInputChange}
      handleInputKeyDown={handleInputKeyDown}
      input={input}
      inputRef={inputRef}
      isFocused={isFocused}
      removeFilter={removeFilter}
      suggestions={suggestions}
      suggestionsRef={suggestionsRef}
      activeSuggestionIndex={activeSuggestionIndex}
      filters={filters}
      handleSuggestionClick={handleSuggestionClick}
    />
  );
}

function noOp() {}

export function SSRCardSearchFilterFallback(props: {
  className?: string;
  input?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
  activeSuggestionIndex?: number;
  removeFilter?: (index: number) => void;
  handleSuggestionClick?: (suggestion: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  suggestionsRef?: React.RefObject<HTMLDivElement>;
  filters?: Filter[];
  suggestions?: string[];
  isFocused?: boolean;
}) {
  const {
    activeSuggestionIndex,
    input,
    className = "",
    handleInputChange = noOp,
    handleInputKeyDown = noOp,
    handleFocus = noOp,
    handleBlur = noOp,
    suggestions = [],
    removeFilter = noOp,
    handleSuggestionClick = noOp,
    inputRef,
    suggestionsRef,
    filters = [],
    isFocused,
  } = props;

  return (
    <>
      <div className={`relative flex-grow ${className}`}>
        <div
          className={clsx(
            // "flex flex-wrap gap-x-2 rounded-md bg-gray-800 border-gray-700 text-white",
            inputStyles,
            "gap-2 items-center px-2",
          )}
        >
          {filters.map((filter, index) => (
            <Badge key={index} className="flex items-center p-1">
              <span className="font-semibold">{filter.name}:</span>
              <span className="ml-1">{filter.value}</span>
              <button
                onClick={() => removeFilter(index)}
                className="ml-2 hover:text-gray-200"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-grow bg-transparent outline-none placeholder-gray-400"
            placeholder={placeholder}
          />
        </div>
        {isFocused && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20 max-h-60 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-2 cursor-pointer text-white ${
                  index === activeSuggestionIndex
                    ? "bg-indigo-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {/*<Button*/}
      {/*  aria-label="Card Search Filters"*/}
      {/*  variant="default"*/}
      {/*  className="bg-indigo-600 hover:bg-indigo-700"*/}
      {/*>*/}
      {/*  <SlidersHorizontal className="mr-2" size={20} />*/}
      {/*  Filters*/}
      {/*</Button>*/}
    </>
  );
}

export default CardSearchFilter;
