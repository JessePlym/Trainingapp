import { useState, useEffect } from "react"

export default function useWindowSize(ref) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: ref.current.offsetWidth,
        heigth: ref.current.offsetHeigth
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    const cleanUp = () => {
      window.removeEventListener("resize", handleResize);
    }

    return cleanUp;
  }, [ref])
  return windowSize;
}
