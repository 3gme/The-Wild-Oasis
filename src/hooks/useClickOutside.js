import { useEffect } from "react";

function useClickOutside(ref, close) {
  return useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [close, ref],
  );
}

export default useClickOutside;
