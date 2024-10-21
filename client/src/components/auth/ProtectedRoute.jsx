import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate(redirect);
    }
  }, []);
  if (user) {
    return <>{children}</>;
  }
};
