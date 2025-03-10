import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout as CoreDashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NAVIGATION from "../../src/navigationConfig";
import demoTheme from "/src/theme";

export default function DashboardLayout({ window }) {
  const navigate = useNavigate();
  const location = useLocation();
  const demoWindow = window !== undefined ? window() : undefined;

  const searchParams = new URLSearchParams(location.search);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        navigate,
        pathname: location.pathname,
        searchParams,
      }}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        homeUrl: "http://localhost:5173/",
        logo: (
          <img
            src="/images/Okland Lion Main Logo@8x.png"
            alt="logo"
          />
        ),
        title: "Okland",
      }}
    >
      <CoreDashboardLayout>
        <Outlet />
      </CoreDashboardLayout>
    </AppProvider>
  );
}
