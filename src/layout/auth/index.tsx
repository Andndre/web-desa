import AppRoot from "../global/AppRoot";
import AppWrap from "../global/AppWrap";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRoot>
      <AppWrap className="nk-wrap-nosidebar">
        <div className="nk-content">{children}</div>
      </AppWrap>
    </AppRoot>
  );
};
