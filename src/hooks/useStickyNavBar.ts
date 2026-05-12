import { useEffect, useRef, useState } from "react";

export function useStickyNavBar() {
    const [hidden, setHidden] = useState(false);

    const lastScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;

            if (current <= 0) {
                setHidden(false);
                lastScroll.current = current;
                return;
            }

            const scrollingDown = current > lastScroll.current;

            if (scrollingDown && current > 200) {
                setHidden(true);
            }

            if (!scrollingDown) {
                setHidden(false);
            }

            lastScroll.current = current;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return hidden;
}
