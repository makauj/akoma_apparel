import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
}

export const SearchBoxComp: React.FC<SearchBoxProps> = ({
  className = "",
  placeholder = "       Search",
}) => {
  return (
  <div
    className={cn(
      "relative w-full max-w-[1224px] h-14 border-b border-gray-300",
      className
    )}
  >
    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <Input
      className="pl-14 w-full h-full text-lg text-gray-500 border-none focus:ring-0 focus:ring-offset-0"
      placeholder={placeholder}
    />
  </div>
);

};

export default SearchBoxComp;
