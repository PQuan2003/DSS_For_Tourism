import { useEffect, useState } from "react";
import { DEBOUNCE_MS } from "@/constants/constants";


const useDebound = ({ value, custom_debounce }) => {
    const delay = custom_debounce || DEBOUNCE_MS;

    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);


        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebound