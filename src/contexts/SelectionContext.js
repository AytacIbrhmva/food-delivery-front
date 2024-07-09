import React, { useEffect } from 'react'

export const SelectionContext = React.createContext();

export default function SelectionProvider({ children }) {
    const [getType, setType] = useEffect({
        type: 0,
        show: 0
    })
    return (
        <SelectionContext.Provider value={{ getType, setType }}>
            {
                children
            }
        </SelectionContext.Provider>
    )
}
