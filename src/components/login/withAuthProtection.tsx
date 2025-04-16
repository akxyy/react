import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthProtection = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/auth/login");
      }
    }, [token]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuthProtection;