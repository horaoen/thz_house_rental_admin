import { AppHeader } from "../../components";

interface PropsType {
  children: React.ReactNode;
}
export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <div>{children}</div>
    </>
  );
};
