import React from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SourceIcon from "@mui/icons-material/Source";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
const NAVIGATION = [
  
  {
    kind: "header",
    title: "Main items",
    path: "/",
  },
  {
    segment: "admins",
    title: "Admins",
    icon: <SupervisorAccountIcon />,
    children: [
      {
        segment: "add-admin",
        title: "Add Admin",
        icon: <CreateNewFolderIcon />,
      },
      {
        segment: "show-admin",
        title: "Show Admin",
        icon: <CreateNewFolderIcon />,
      },
    ],
  },
  {
    segment: "products",
    title: "Products",
    icon: <SourceIcon />,
    children: [
      {
        segment: "add-Product",
        title: "Add Product",
        icon: <CreateNewFolderIcon />,
      },
      {
        segment: "show-Product",
        title: "Show Product",
        icon: <CreateNewFolderIcon />,
      },
    ],
  },
];

export default NAVIGATION;
