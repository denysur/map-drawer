import { useEffect, useRef } from "react";

/**
 * This hook sets the title of the page.
 *
 * @param title
 */
export const useTitle = (title: string) => {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current || "Times of Ukraine Map";
    };
  }, []);
};
