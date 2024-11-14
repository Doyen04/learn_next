"use client"

import { gsap } from "gsap";
import React, { useRef } from "react";



function AnimatedInput({type, name, placeholder, placeholder_style, input_style}:{ type:string, name:string, placeholder:string, placeholder_style: string, input_style: string}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    function handleFocus() {
        if (labelRef.current) {
            gsap.to(labelRef.current, { y: -9,borderRadius: '2px', fontSize: "0.8em", color: "#757581", duration: 0.3 , background: 'white', padding: '2px'});
        }
    };

    function handleBlur() {
        if (labelRef.current && inputRef.current?.value === "") {
            gsap.to(labelRef.current, { y: 15, fontSize: "1em",color: "#757581", duration: 0.3 });
        }
    };

    return (
        <div>
            <label ref={labelRef} htmlFor={type} className={placeholder_style}>{placeholder}</label>
            <input ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} type={type} name={name} id={name} placeholder={placeholder} className={input_style} />
        </div>
    )
}
export default AnimatedInput;