import { useEffect } from "react";

export default function useDisableZoom() {
  useEffect(() => {

    const preventZoomKeys = (e) => {
      // Ctrl + scroll / Ctrl + + / Ctrl + -
      if (
        e.ctrlKey &&
        (e.key === "+" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    const preventWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const preventGesture = (e) => {
      e.preventDefault(); // mobile pinch zoom
    };

    document.addEventListener("keydown", preventZoomKeys);
    document.addEventListener("wheel", preventWheelZoom, { passive: false });
    document.addEventListener("gesturestart", preventGesture);

    return () => {
      document.removeEventListener("keydown", preventZoomKeys);
      document.removeEventListener("wheel", preventWheelZoom);
      document.removeEventListener("gesturestart", preventGesture);
    };

  }, []);
}