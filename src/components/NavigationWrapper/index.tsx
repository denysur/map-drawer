import { FC, ReactNode, useEffect } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useLocation, useNavigate } from "react-router";
import { PAGES } from "../../constants";

const NavigationWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthorized, isLoading } = useAuthorization();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (pathname === PAGES.HOME && isAuthorized) {
        navigate(PAGES.DASHBOARD);
      } else if (!isAuthorized) {
        navigate(PAGES.HOME);
      }
    }
  }, [isAuthorized, pathname, isLoading]);

  if (isLoading) {
    return null;
  }

  return children;
};

export default NavigationWrapper;
