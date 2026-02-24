import { ReactNode, useState, useRef, useCallback, useEffect } from "react";
import "./popup.css"

interface DraggablePopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Popup: React.FC<DraggablePopupProps> = ({
    isOpen, 
    onClose,
    children
}) => {
    if (!isOpen) return null;
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0});
    const startPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const popupRef = useRef<HTMLDivElement>(null);
    const view = document.getElementById("popup-content");

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startPos.current.x,
            y: e.clientY - startPos.current.y,
        });
    }, [isDragging])

    const onMouseUp = (() => {
        setIsDragging(false);
    })

    const onMouseDown = ((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDragging(true);
        startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    })

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    }, [onMouseMove])

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div 
                className="popup-container" 
                ref={popupRef}
                onClick={(e) => {e.stopPropagation()}} 
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                onMouseDown={onMouseDown}
            >
                <div id="popup-content">
                    {/* <div className={view.scrollHeight - view.scrollTop - view.clientHeight < 1 ? "" : "scroll-shadow"} /> */}
                    {children}
                </div>
                <button className="popup-close" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    )
}

export default Popup;


