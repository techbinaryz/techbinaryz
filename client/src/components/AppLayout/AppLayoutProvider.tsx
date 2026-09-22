import React, { Fragment } from "react";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

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
