import { useEffect, useState } from "react";

const useKeyboardShortcut = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  const [os, setOs] = useState<"mac" | "windows" | "other">("other");

  useEffect(() => {
    const detectOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform.toLowerCase();

      if (platform.includes("mac") || userAgent.includes("mac")) {
        return "mac";
      } else if (platform.includes("win") || userAgent.includes("windows")) {
        return "windows";
      }
      return "other";
    };

    setOs(detectOS());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifierPressed = os === "mac" ? e.metaKey : e.ctrlKey;

      if (isModifierPressed && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [os, inputRef]);

  return { os };
};

export default useKeyboardShortcut;
