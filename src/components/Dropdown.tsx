import './Dropdown.scss'
import {ITableData} from '../interfaces/Interfaces'
import { useState, useRef, useEffect } from 'react'

interface DropdownProps {
    options: ITableData[],
    prompt: string,
    value: string | null,
    onChange: (a: string | null) => void,
    id: string,
    label: any
}

const Dropdown = ({options, prompt, value, onChange, id, label}: DropdownProps ) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [])

    function close(e: MouseEvent) {
        setOpen(e && e.target === ref.current)
    }

    function filter(options: ITableData[]) {
        return options.filter((option: any) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1)
    }

    console.log(filter(options))
    function displayValue() {
        if(query.length > 0) return query;
        if(value) return value[label];
        return ""
    }
    return ( 
        <div className="dropdown">
            <div className="control" onClick={() => setOpen(prev => !prev) }>
                <div className="selected-value" ref={ref}>
                    <input type="text" 
                    
                    placeholder={value ? value : prompt}
                    value={displayValue()}
                    onChange={e => {
                        setQuery(e.target.value)
                        onChange(null)
                    }}
                    onClick={() => setOpen(prev => !prev)}
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}`} />
            </div>
            <div className={`options ${open ? "open" : null}`} >
                {
                    options.map((option: any) => 
                    <div 
                        key={option[id]}
                        className={`option ${value === option[label] ? "selected" : null}`}
                            onClick={() => {
                                setQuery("")
                                onChange(option[label]);
                                setOpen(false);
                    }}>
                        {option[label]}
                    </div>)
                }
                
            </div>
        </div>

    )
}

export default Dropdown;