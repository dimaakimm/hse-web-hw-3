import { useLocation } from "react-router-dom";

const PAGE_TITLES: Record<string, string> = {
  "/": "Главная",
  "/jobs": "Поиск работы",
  "/books": "Книги",
  "/movies": "Фильмы",
};

export const useGetPageTitle = (): string => {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const basePath = segments.length ? `/${segments[0]}` : "/";

  return PAGE_TITLES[basePath] ?? "Страница";
};
