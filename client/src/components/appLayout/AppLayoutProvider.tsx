import React, { Fragment } from "react";
import AppHeader from "./appHeader/AppHeader";
import AppContent from "./AppContent";
import Footer from "../global/Footer";


interface AppLayoutProviderProps {
  children: React.ReactNode;
}

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  return (
    <Fragment>
      <AppHeader />
      <AppContent>{children}</AppContent>
      <Footer />
    </Fragment>
  );
}

export default AppLayoutProvider;
