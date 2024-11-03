"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function CardSearchFilter({
  autoFocus = false,
  className,
  ...props
}: CustomFilterInputProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const parts = input.split(":");
    if (parts.length === 1) {
      setSuggestions(
        availableFilters
          .map((f) => f.name)
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
  }, [input]);

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
    <>
      <div className={`relative flex-grow ${className}`}>
        <div className="flex flex-wrap gap-2 p-2 rounded-md bg-gray-800 border-gray-700 text-white">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-indigo-600 text-white rounded-full px-3 py-1 text-sm"
            >
              <span className="font-semibold">{filter.name}:</span>
              <span className="ml-1">{filter.value}</span>
              <button
                onClick={() => removeFilter(index)}
                className="ml-2 text-white hover:text-gray-200"
              >
                <X size={14} />
              </button>
            </div>
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
            placeholder="Type a filter (e.g., name:value)"
            {...props}
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
      <Button
        aria-label="Card Search Filters"
        variant="default"
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        <SlidersHorizontal className="mr-2" size={20} />
        Filters
      </Button>
    </>
  );
}
