import { useEffect } from "react";

const SITE_NAME = "Thailand Hayom";

export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | ${SITE_NAME}`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
