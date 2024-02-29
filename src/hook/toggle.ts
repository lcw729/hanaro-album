import {useReducer} from "react";

export const useToggle = (initialValue: boolean) => {

    const [state, dispatch] = useReducer((pre) => !pre, initialValue);

    return [state, dispatch] as const;
}