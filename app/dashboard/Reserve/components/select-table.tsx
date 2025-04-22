// SelectComponent.tsx
import React from 'react';
import { Button } from '@/components/ui/button'

interface Area {
    tableNumber: string
    state: string
    seats: number
}


interface SelectComponentProps {
    availableTables: Area[];
    selectedTable: string; // 當前選中的桌號
    onTableChange: (value: string) => void; // 當選擇改變時的回調函數
}

const SelectComponent: React.FC<SelectComponentProps> = ({ availableTables, selectedTable, onTableChange }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-end w-[340px]">
            {availableTables.length > 0 ? (
                availableTables.map(table => (
                    <Button
                        key={table.tableNumber}
                        type="button"
                        className={`py-2 border rounded-full hover:bg-[#bf6c41] hover:text-white ${
                            selectedTable === table.tableNumber
                                ? 'bg-[#bf6c41] text-white'
                                : 'bg-white text-black'
                        }`}
                        onClick={() => onTableChange(table.tableNumber)}
                    >
                        {table.tableNumber} <span className='text-xs'>({table.seats}人)</span>
                    </Button>
                ))
            ) : (
                <div className="text-gray-500">無可用桌號</div>
            )}
        </div>
    );
};

export default SelectComponent;

