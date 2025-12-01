import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const FilterDropdown = ({ title, options, onSelect, activeFilters = [] }) => {
    const isActive = activeFilters.length > 0;

    const [filterOptions, setFilterOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue);

    useEffect(() => {
        setFilterOptions(options);
    }, [options]);

    useEffect(() => {
        const searchOption = options?.filter((option) => {
            const text = Array.isArray(option) ? option[0] : option;
            return text?.toLowerCase().includes(debouncedSearchValue?.toLowerCase());
        });
        setFilterOptions(searchOption);
    }, [debouncedSearchValue, options]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={`flex items-center gap-1 font-normal tracking-wider
            ${isActive ? "border-primary ring-1 ring-primary text-primary" : ""}
          `}
                >
                    {title}
                    {isActive && (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                            {activeFilters.length}
                        </Badge>
                    )}
                    <ChevronDown
                        className={`ml-auto h-4 w-4 shrink-0 opacity-50 ${isActive && "text-primary"
                            }`}
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="max-h-[60vh] overflow-auto">
                <div className="relative py-0.5">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </span>
                    <Input
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 border-transparent ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                    />
                </div>
                {filterOptions?.length === 0 ? (
                    <div className="px-1 my-3 justify-between text-center">
                        No Result Found
                    </div>
                ) : (
                    filterOptions?.map((option) => {
                        const optionValue = Array.isArray(option) ? option[0] : option;
                        const isSelected = (activeFilters || [])
                            .flat()
                            .includes(optionValue);
                        return (
                            <DropdownMenuCheckboxItem
                                className={`cursor-pointer`}
                                key={optionValue}
                                checked={isSelected}
                                onSelect={(e) => {
                                    e.preventDefault();
                                    onSelect(option);
                                }}
                            >
                                {option}
                            </DropdownMenuCheckboxItem>
                        );
                    })
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterDropdown;
