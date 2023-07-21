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

export default function Products() {
  const { loginToken } = useSelector((state) => state.authReducer);
  const { push } = useRouter();
  const [fetchData, setFetchData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [addForm, setAddForm] = useState({
    name: "",
    product_id: "",
    client_id: 0,
  });
  const [editForm, setEditForm] = useState({
    product_name: "",
    product_id: "",
    client_id: 0,
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
    const data = await getAPI("products", null);
    if (data?.status) {
      setFetchData(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };

  const getClientData = async () => {
    setIsLoading(true);
    const data = await getAPI("clients", null);
    if (data?.status) {
      setClientData(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };

  useEffect(() => {
    getData();
    getClientData();
  }, []);

  const editIcon = (item) => {
    setEditForm(item);
  };

  const addBtn = async () => {
    if (addForm?.name !== "") {
      const data = await postAPI("products", addForm, null);
      if (data?.status) {
        toast.success("Product is added succesfully");
        await getData();
        setAddForm({
          name: "",
          product_id: "",
          client_id: 0,
        });
      } else {
        toast.error(`Product is not added. ${data?.message}`);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const updateBtn = async () => {
    if (editForm?.product_name !== "" && editForm?.client_id !== 0) {
      console.log(editForm);
      const data = await putAPI("products", editForm, null);
      if (data?.status) {
        toast.success("Product is updated succesfully");
        await getData();
        setEditForm({
          product_name: "",
          product_id: "",
          client_id: 0,
        });
      } else {
        toast.error(`Product is not updated. ${data?.message}`);
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
                          <h1>Add Product</h1>
                          <div className="pt-5">
                            <label htmlFor="productLineName">
                              Product Name
                            </label>
                            <input
                              type="text"
                              className="form-control pb-2"
                              id="productLineName"
                              value={addForm?.name}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  name: e.target.value,
                                })
                              }
                            />
                            <div className="choose pt-5">
                              <label htmlFor="client">Choose Clients</label>
                              <select
                                id="client"
                                onChange={(e) =>
                                  setAddForm({
                                    ...addForm,
                                    client_id: e.target.value,
                                  })
                                }
                              >
                                <option value={0}>Choose Clients</option>
                                {clientData &&
                                  clientData.map((item, index) => (
                                    <option key={index} value={item?.client_id}>
                                      {item?.name}
                                    </option>
                                  ))}
                              </select>
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
                        </div>
                        {editForm?.product_id !== "" && (
                          <div className="screen_header shadow">
                            <h1>EDIT Products</h1>
                            <div className="pt-5">
                              <label htmlFor="productName">Products</label>
                              <input
                                type="text"
                                className="form-control pb-2"
                                id="productName"
                                value={editForm?.product_name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    product_name: e.target.value,
                                  })
                                }
                              />
                              <div className="choose pt-5">
                                <label htmlFor="client">Choose Clients</label>
                                <select
                                  id="client"
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      client_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value={0}>Choose Clients</option>
                                  {clientData &&
                                    clientData.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item?.client_id}
                                        selected={
                                          item?.client_id ===
                                          editForm?.client_id
                                        }
                                      >
                                        {item?.name}
                                      </option>
                                    ))}
                                </select>
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
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                          <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                              <span className="card-label fw-bold fs-3 mb-1">
                                Products
                              </span>
                              <span className="text-muted mt-1 fw-semibold fs-7">
                                Total {fetchData && fetchData.length} Products
                              </span>
                            </h3>
                          </div>
                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className=" min-w-150px">Products</th>
                                      <th>Clients</th>
                                      <th className=" min-w-140px">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fetchData &&
                                      fetchData.map((item, index) => (
                                        <tr key={index}>
                                          <td className="fw-semibold">
                                            {item?.product_name}
                                          </td>
                                          <td className="fw-semibold">
                                            {item?.client_name}
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
