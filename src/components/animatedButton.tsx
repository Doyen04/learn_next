"use client"

import React, { useRef } from "react";
import { gsap } from "gsap";


function AnimatedButton({ text, style, type }: { text: string, style: string, type: "button" | "submit" | "reset" | undefined }) {
    const textRef = useRef<HTMLButtonElement>(null);

    async function animate() {
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll(".char");

            gsap.fromTo(
                chars,
                { y: 0 },
                { 
                    y: -10,                // Move each character up by 20px
                    duration: 0.8,      // Duration of each "jump"
                    ease: "power2.inOut",
                    repeat: -1,
                    stagger: {
                        each: 0.15,          // Delay each character by 0.15 seconds
                        yoyo: true,          // Return to the original position
                    },
                }
            );
            
            gsap.to(
                chars,
                {
                    y: 0, duration: 0.8,     // Duration of each "jump"
                    ease: "power2.out", 
                    repeat: -1,
                    stagger: {
                        each: 0.25,          // Delay each character by 0.15 seconds
                        yoyo: true,          // Return to the original position
                    },
                }
            )
        }
    }

    return (
        <button onClick={animate} ref={textRef} type={type} style={{ display: "flex", gap: "1px" }} className={style} disabled>
            {text.split("").map((char: string, index: number) => (
                <span key={index} className="char">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </button>
    );
};

export default AnimatedButton;