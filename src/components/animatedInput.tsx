"use client"

import { gsap } from "gsap";
import React, { useRef } from "react";

interface AnimatedInputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string
    input_style: string;
    placeholder_style: string;
    error: string[] |undefined;
    error_style: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>; // Proper typing here
}

function AnimatedInput(
    { type, name, placeholder, placeholder_style, input_style, value,error, error_style, onChange }: AnimatedInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    function handleFocus() {
        if (labelRef.current) {
            gsap.to(labelRef.current, { y: -9, borderRadius: '2px', fontSize: "0.8em", color: "#757581", duration: 0.3, background: 'white', padding: '2px' });
        }
    };

    function handleBlur() {
        if (labelRef.current && inputRef.current?.value === "") {
            gsap.to(labelRef.current, { y: 15, fontSize: "1em", color: "#757581", duration: 0.3 });
        }
    };

    return (
        <div>
            <label ref={labelRef} htmlFor={type} className={placeholder_style} style={{ pointerEvents: "none" }}>{placeholder}</label>
            <input
                ref={inputRef}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className={input_style}
                onChange={onChange} required />
                <p className={error_style}>{error}</p> 
        </div>
    )
}
export default AnimatedInput;