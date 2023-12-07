import { SideMenu } from "../ui/sidemenu/SideMenu";
const HomePage = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[160px_1fr] lg:gap-0 lg:[&:has(>*:first-child:hover)]:grid-cols-[280px_1fr]">
      <div className="h-32 rounded-lg bg-gray-200">
        <SideMenu></SideMenu>
      </div>
      <div className="h-32 rounded-lg px-2 py-4 ">{children}</div>
    </div>
  );
};

export default HomePage;
