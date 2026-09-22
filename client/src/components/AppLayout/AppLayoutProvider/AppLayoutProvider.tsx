import React, { Fragment } from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppContent from "../AppContent/AppContent";
import AppFooter from "../AppFooter/AppFooter";

interface AppLayoutProviderProps {
  children: React.ReactNode;
}

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  return (
    <Fragment>
      <AppHeader />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </Fragment>
  );
}

export default AppLayoutProvider;
