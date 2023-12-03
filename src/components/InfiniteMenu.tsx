import React, { useState, useEffect, useRef } from 'react';

const useWindowSize = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

const isMobileDevice = () => {
    return /android|bb\d+|meego.+mobile|...|zte-/i.test(navigator.userAgent);
};

const InfiniteMenuComponent: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const winsize = useWindowSize();
    const menuRef = useRef<HTMLElement>(null);
    let scrollPos = 0;
    let clonesHeight = 0;
    let scrollHeight = 0;

    const getScrollPos = () => menuRef.current ? menuRef.current.scrollTop : 0;
    const setScrollPos = (pos: number) => {
        if (menuRef.current) {
            menuRef.current.scrollTop = pos;
        }
    };

    const cloneItems = () => {
        if (menuRef.current) {
            const menuItems = Array.from(menuRef.current.querySelectorAll('.menu__item'));
            const itemHeight = menuItems[0].clientHeight;
            const fitIn = Math.ceil(winsize.height / itemHeight);

            menuRef.current.querySelectorAll('.loop__clone').forEach(clone => clone.remove());

            let totalClones = 0;
            menuItems.filter((_, index) => index < fitIn).forEach(target => {
                const clone = target.cloneNode(true) as HTMLElement;
                clone.classList.add('loop__clone');
                menuRef.current?.appendChild(clone);
                totalClones++;
            });

            clonesHeight = totalClones * itemHeight;
            scrollHeight = menuRef.current.scrollHeight;
        }
    };

    const scrollUpdate = () => {
        scrollPos = getScrollPos();

        if (clonesHeight + scrollPos >= scrollHeight) {
            setScrollPos(1);
        } else if (scrollPos <= 0) {
            setScrollPos(scrollHeight - clonesHeight);
        }
    };

    const renderLoop = () => {
        scrollUpdate();
        requestAnimationFrame(renderLoop);
    };

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);

    useEffect(() => {
        if (!isMobile && menuRef.current) {
            cloneItems();
            setScrollPos(1);
            renderLoop();

            window.addEventListener('resize', cloneItems);

            return () => window.removeEventListener('resize', cloneItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, winsize]);

    return (
        <nav ref={menuRef} className="menu">
            {/* Menu items here */
                <>
                    <div key="1" className="menu__item">
                        <a className="menu__item-inner">{"Good"}</a>
                    </div>
                    <div key="2" className="menu__item">
                        <a className="menu__item-inner">{"bye"}</a>
                    </div>
                    <div key="3" className="menu__item">
                        <a className="menu__item-inner">{"this"}</a>
                    </div>
                    <div key="4" className="menu__item">
                        <a className="menu__item-inner">{"is"}</a>
                    </div>
                    <div key="5" className="menu__item">
                        <a className="menu__item-inner">{"a"}</a>
                    </div>
                    <div key="6" className="menu__item">
                        <a className="menu__item-inner">{"nice"}</a>
                    </div>
                    <div key="7" className="menu__item">
                        <a className="menu__item-inner">{"sunday"}</a>
                    </div>
                    <div key="8" className="menu__item">
                        <a className="menu__item-inner">{"night"}</a>
                    </div>
                </>
            }

        </nav>
    );
};

export default InfiniteMenuComponent;
