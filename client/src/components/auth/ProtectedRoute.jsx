import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
export const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    if (!user) {
      return navigate(redirect);
    }
  }, []);

  if (user) {
    return children ? children : <Outlet />;
  }
};
