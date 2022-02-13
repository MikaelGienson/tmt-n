import './Dropdown.scss'
import {ITableData} from '../interfaces/Interfaces'
import { useState, useRef, useEffect, SyntheticEvent } from 'react'

interface DropdownProps {
    options: ITableData[],
    prompt: string,
    value: string | null,
    onChange: (a: string) => void,
    id: string,
    label: string
}

const Dropdown = ({options, prompt, value, onChange, id, label}: DropdownProps ) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [])

    function close(e: MouseEvent) {
        setOpen(e && e.target === ref.current)
    }
    return ( 
        <div className="dropdown">
            <div className="control" onClick={() => setOpen(prev => !prev) }>
                <div className="selected-value" ref={ref}>{
                    value ? label : prompt
                }</div>
                <div className={`arrow ${open ? "open" : null}`} />
            </div>
            <div className={`options ${open ? "open" : null}`} >
                {
                    options.map((option: ITableData) => 
                    <div 
                        key={option.id}
                        className={`option ${value === option.assignee ? "selected" : null}`}
                            onClick={() => {
                            onChange(option.assignee);
                            setOpen(false);
                    }}>
                        {option.label}
                    </div>)
                }
                
            </div>
        </div>

    )
}

export default Dropdown;