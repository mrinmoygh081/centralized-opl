import Head from "next/head";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getAPI, postAPI, putAPI } from "@/utils/fetchAPIs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Screens() {
  const { loginToken } = useSelector((state) => state.authReducer);
  const { push } = useRouter();
  const [fetchData, setFetchData] = useState(null);
  const [addForm, setAddForm] = useState({
    screen_ip: "",
    screen_name: "",
  });
  const [editForm, setEditForm] = useState({
    screen_ip: "",
    screen_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      let token = { loginToken };
      let isAuth = await postAPI("isAuth", token, null);
      if (!isAuth?.status) {
        push("/login");
      }
    })();
  }, [loginToken, push]);

  const getData = async () => {
    setIsLoading(true);
    const data = await getAPI("screens", null);
    if (data?.status) {
      setFetchData(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const editIcon = (item) => {
    console.log(item);
    setEditForm(item);
  };

  const addBtn = async () => {
    console.log("addForm", addForm);
    if (addForm?.screen_ip !== "" && addForm?.screen_name !== "") {
      const data = await postAPI("screens", addForm, null);
      if (data?.status) {
        toast.success("Screen is added succesfully");
        await getData();
        setAddForm({
          screen_ip: "",
          screen_name: "",
        });
      } else {
        toast.error(`Screen is not added. ${data?.message}`);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const updateBtn = async () => {
    if (editForm?.screen_ip !== "" && editForm?.screen_name !== "") {
      const data = await putAPI("screens", editForm, null);
      if (data?.status) {
        toast.success("Screen is updated succesfully");
        await getData();
        setEditForm({
          screen_ip: "",
          screen_name: "",
        });
      } else {
        toast.error(`Screen is not updated. ${data?.message}`);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <>
      <Head>
        <title>Centralized OPL</title>
        <meta name="description" content="Generated by Centralized OPL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid">
            <SideBar />
            <div className="wrapper d-flex flex-column flex-row-fluid">
              <Header />
              <div
                className="content d-flex flex-column flex-column-fluid"
                id="kt_content"
              >
                <div className="post d-flex flex-column-fluid">
                  <div id="kt_content_container" className="container-xxl">
                    <div className="row g-5 g-xl-8">
                      <div className="col-md-6 col-12">
                        <div className="screen_header shadow">
                          <h1>Add Screen</h1>
                          <div className="pt-5">
                            <label htmlFor="ScreenId">Screen ID</label>
                            <input
                              type="text"
                              className="form-control pb-2"
                              id="ScreenId"
                              value={addForm?.screen_ip}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  screen_ip: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="pt-5">
                            <label htmlFor="ScreenName">Screen Name</label>
                            <input
                              type="text"
                              className="form-control pb-2"
                              id="ScreenName"
                              value={addForm?.screen_name}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  screen_name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="text-start py-3">
                            <button
                              onClick={addBtn}
                              className="btn fw-bold btn-primary"
                            >
                              ADD
                            </button>
                          </div>
                        </div>
                        {editForm?.screen_ip !== "" && (
                          <div className="screen_header shadow">
                            <h1>EDIT Screens</h1>
                            <div className="pt-5">
                              <label htmlFor="screenId">Screen ID</label>
                              <input
                                type="text"
                                className="form-control pb-2"
                                id="screenId"
                                value={editForm?.screen_ip}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    screen_ip: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="pt-5">
                              <label htmlFor="screen_name">Screen Name</label>
                              <input
                                type="text"
                                className="form-control pb-2"
                                id="screen_name"
                                value={editForm?.screen_name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    screen_name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="text-start py-3">
                              <button
                                onClick={updateBtn}
                                className="btn fw-bold btn-primary"
                              >
                                UPDATE
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                              <span className="card-label fw-bold fs-3 mb-1">
                                Screens
                              </span>
                              <span className="text-muted mt-1 fw-semibold fs-7">
                                Total {fetchData && fetchData.length} Screens
                              </span>
                            </h3>
                          </div>
                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className=" min-w-150px">
                                        Screen ID
                                      </th>
                                      <th className=" min-w-150px">
                                        Screen Name
                                      </th>
                                      <th className=" min-w-140px">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fetchData &&
                                      fetchData.map((item, index) => (
                                        <tr key={index}>
                                          <td className="fw-semibold">
                                            {item?.screen_ip}
                                          </td>
                                          <td className="fw-semibold">
                                            {item?.screen_name}
                                          </td>
                                          <td>
                                            <button
                                              onClick={() => editIcon(item)}
                                              className="btn btn-icon btn-light btn-active-color-primary btn-sm me-1"
                                            >
                                              <FontAwesomeIcon icon={faPen} />
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
