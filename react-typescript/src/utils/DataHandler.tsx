import React, { useState, useEffect, useCallback } from "react";
import { APIHandler } from "./tools";

export type SetData = React.Dispatch<React.SetStateAction<ToDos[] | null>>;
export type UpdateData = (id: number, newData: ToDos) => void;
export type DeleteData = (id: number) => void;

interface ContextProps {
    data: ToDos[] | null;
    setData: SetData;
    UpdateData: UpdateData;
    DeleteData: DeleteData;
}

export const ContextData = React.createContext<Partial<ContextProps>>({});

const DataHandler: React.FC = ({ children }) => {
    const [data, setData] = useState<ToDos[] | null>(null);

    const UpdateData = useCallback((id: number, newData: ToDos) => {
        setData((data as ToDos[]).map(element => {
            if (element.id === id)
                element = newData;
            return element;
        }))
    }, [data])

    const DeleteData = useCallback((id: number) => {
        setData((data as ToDos[]).filter(element => element.id !== id));
    }, [data])

    useEffect(() => {
        APIHandler.Instance.get('.').then(response => {
            setData(response.data);
        })
    }, [])

    return (
        <ContextData.Provider value={{
            data: data,
            setData: setData,
            UpdateData: UpdateData,
            DeleteData: DeleteData
        }}>
            {children}
        </ContextData.Provider>
    )
}

export default DataHandler;