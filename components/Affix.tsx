import { useState, useEffect, useRef, ReactNode } from "react";

interface AffixProps {
  /** Distance from the top of the viewport */
  offset?: number;
  /** Target DOM node to use as the offset parent */
  target?: HTMLElement | null;
  /** z-index of the affixed element */
  zIndex?: number;
  children: ReactNode;
}

export default function Affix({
  children,
  offset = 0,
  target = null,
  zIndex = 4000,
}: AffixProps) {
  const [isAffixed, setIsAffixed] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const childrenRef = useRef<any>(null);
  const affixedRef = useRef<any>(null);

  useEffect(() => {
    // Handle scroll event to determine if we should affix
    const handleScroll = () => {
      if (!target && !childrenRef.current) return;

      // Get the target position
      const targetElement = target ?? childrenRef.current.offsetParent;
      const targetRect = targetElement?.getBoundingClientRect();

      // Determine if the element should be affixed
      const shouldAffix =
        targetRect && window.scrollY + offset >= targetRect.top;

      setIsAffixed(shouldAffix);
    };

    // Initial check
    handleScroll();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [target, childrenRef, offset]);

  useEffect(() => {
    // Update the position when affixed state changes
    if (affixedRef.current) {
      setPosition({
        top: offset,
        left: 0,
        width: affixedRef.current.offsetWidth,
      });
    }
  }, [affixedRef, offset]);

  return (
    <>
      {/* Original children */}
      <div ref={childrenRef}>{children}</div>

      {/* Affixed clone */}
      {isAffixed && (
        <div
          ref={affixedRef}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: position.width,
            zIndex: zIndex,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
