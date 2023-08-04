import { masterMenuData } from "@/data/SideBarData";
import { logoutFun } from "@/redux/actions";
import { Persistor } from "@/redux/store";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

export default function SideBar() {
  const dispatch = useDispatch();
  const [isDropOpen, setIsDropOpen] = useState(false);
  const toggleDropMenu = () => setIsDropOpen(!isDropOpen);

  const logOutHandler = () => {
    dispatch(logoutFun());
    Persistor.pause();
    Persistor.flush().then(() => {
      return Persistor.purge();
    });
  };

  return (
    <>
      <div id="kt_aside" className="aside aside-dark aside-hoverable">
        <div className="aside-logo flex-column-auto" id="kt_aside_logo">
          <Link href="/" className="logo_link">
            <span>SUDISA OPL</span>
          </Link>
        </div>
        {/* Aside menu */}
        <div className="aside-menu flex-column-fluid">
          <div
            className="hover-scroll-overlay-y my-5 my-lg-5"
            id="kt_aside_menu_wrapper"
            style={{ height: "calc(100vh - 100px)" }}
          >
            <div
              className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
              id="#kt_aside_menu"
              data-kt-menu="true"
              data-kt-menu-expand="false"
            >
              <div data-kt-menu-trigger="click" className="menu-item">
                <Link href="/" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Start Screens</span>
                </Link>
              </div>
              <div data-kt-menu-trigger="click" className="menu-item">
                <Link href="/Home" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </div>
              {/* <div data-kt-menu-trigger="click" className="menu-item">
                <Link href="/alert" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Alert</span>
                </Link>
              </div> */}
              <div className="menu-item">
                <div className="menu-content pt-8 pb-2">
                  <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                    Masters
                  </span>
                </div>
              </div>

              {masterMenuData &&
                masterMenuData.map((item, index) => (
                  <div className="menu-item menu-accordion" key={index}>
                    <span className="menu-link" onClick={toggleDropMenu}>
                      <span className="menu-icon">
                        <span className="svg-icon svg-icon-2">
                          {item?.icon}
                        </span>
                      </span>
                      <span className="menu-title">{item?.title}</span>
                      <span className="menu-arrow"></span>
                    </span>
                    <div
                      className={
                        isDropOpen
                          ? "menu-sub menu-sub-accordion menu-active-bg hover show"
                          : "menu-sub menu-sub-accordion menu-active-bg"
                      }
                    >
                      {item?.subMenu &&
                        item?.subMenu.length > 0 &&
                        item.subMenu.map((it, i) => (
                          <div className="menu-item" key={i}>
                            <a className="menu-link" href={it?.link}>
                              <span className="menu-bullet">
                                <span className="bullet bullet-dot"></span>
                              </span>
                              <span className="menu-title">{it?.title}</span>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              <div data-kt-menu-trigger="click" className="menu-item">
                <Link href="/relmanagement" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">OPL Management</span>
                </Link>
              </div>

              <div className="menu-item">
                <div className="menu-content pt-8 pb-2">
                  <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                    LogOut
                  </span>
                </div>
              </div>

              <div data-kt-menu-trigger="click" className="menu-item">
                <Link href={"#"} onClick={logOutHandler} className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Log Out</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* /Aside menu */}
      </div>
    </>
  );
}
