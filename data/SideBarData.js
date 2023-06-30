import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export const masterMenuData = [
  {
    title: "Master Setup",
    icon: <FontAwesomeIcon icon={faGear} />,
    link: "#",
    subMenu: [
      {
        title: "Product Lines",
        link: "/productlines",
      },
      {
        title: "Products",
        link: "/products",
      },
      {
        title: "Sub Parts of Products",
        link: "/productparts",
      },
      {
        title: "Screens",
        link: "/screens",
      },
      {
        title: "Instructions",
        link: "/instructions",
      },
      {
        title: "Shifts",
        link: "/shifts",
      },
    ],
  },
];
