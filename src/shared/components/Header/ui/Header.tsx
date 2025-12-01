import { Tabs } from "../../Tabs";
import { useGetPageTitle } from "../../../../screens/MoviesPage/lib/useGetPageTitle.ts";

export const Header = () => {
  const title = useGetPageTitle();

  return (
    <div className="header">
      <div className="title">{title}</div>
      <Tabs />
    </div>
  );
};
