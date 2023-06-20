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

export default function Productparts() {
  const { loginToken } = useSelector((state) => state.authReducer);
  const { push } = useRouter();
  const [fetchData, setFetchData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [addForm, setAddForm] = useState({
    parts_name: "",
    product_id: 0,
  });
  const [editForm, setEditForm] = useState({
    subproduct_id: "",
    parts_name: "",
    product_id: 0,
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
    const data = await getAPI("productparts", null);
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

  const getProductData = async () => {
    setIsLoading(true);
    const data = await getAPI("products", null);
    if (data?.status) {
      setProductData(data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong", data?.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  const editIcon = (item) => {
    console.log(item);
    setEditForm(item);
  };

  const addBtn = async () => {
    console.log(addForm);
    if (addForm?.parts_name !== "" && addForm?.product_id !== 0) {
      const data = await postAPI("productparts", addForm, null);
      if (data?.status) {
        toast.success("Product Part is added succesfully");
        await getData();
        setAddForm({
          parts_name: "",
          product_id: 0,
        });
      } else {
        toast.error(`Product Part is not added. ${data?.message}`);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const updateBtn = async () => {
    console.log(editForm);
    if (editForm?.parts_name !== "" && editForm?.product_id !== 0) {
      const data = await putAPI("productparts", editForm, null);
      if (data?.status) {
        toast.success("Product Part is updated succesfully");
        await getData();
        setEditForm({
          subproduct_id: "",
          parts_name: "",
          product_id: 0,
        });
      } else {
        toast.error(`Product Part is not updated. ${data?.message}`);
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
                          <h1>Add Product Part</h1>
                          <div className="pt-5">
                            <label htmlFor="productpartname">
                              Product Part Name
                            </label>
                            <input
                              type="text"
                              className="form-control pb-2"
                              id="productpartname"
                              value={addForm?.parts_name}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  parts_name: e.target.value,
                                })
                              }
                            />
                            <div className="choose pt-5">
                              <label htmlFor="shifts">Choose Products</label>
                              <select
                                id="shifts"
                                onChange={(e) =>
                                  setAddForm({
                                    ...addForm,
                                    product_id: e.target.value,
                                  })
                                }
                              >
                                <option value={0}>Choose Products</option>
                                {productData &&
                                  productData.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item?.product_id}
                                    >
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
                        {editForm?.subproduct_id !== "" && (
                          <div className="screen_header shadow">
                            <h1>EDIT Product Parts</h1>
                            <div className="pt-5">
                              <label htmlFor="partname">
                                Product Part Name
                              </label>
                              <input
                                type="text"
                                className="form-control pb-2"
                                id="partname"
                                value={editForm?.parts_name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    parts_name: e.target.value,
                                  })
                                }
                              />
                              <div className="choose pt-5">
                                <label htmlFor="shifts">Choose Products</label>
                                <select
                                  id="shifts"
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      product_id: e.target.value,
                                    })
                                  }
                                >
                                  <option value={0}>Choose Products</option>
                                  {productData &&
                                    productData.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item?.product_id}
                                        selected={
                                          item?.product_id ===
                                          editForm?.product_id
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
                                Product Parts
                              </span>
                              <span className="text-muted mt-1 fw-semibold fs-7">
                                Total {fetchData && fetchData.length} Product
                                Parts
                              </span>
                            </h3>
                          </div>
                          <div className="card-body py-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr className="border-0">
                                      <th className=" min-w-150px">Product</th>
                                      <th className=" min-w-150px">
                                        Product Parts
                                      </th>
                                      <th className=" min-w-140px">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fetchData &&
                                      fetchData.map((item, index) => (
                                        <tr key={index}>
                                          <td className="fw-semibold">
                                            {item?.name}
                                          </td>
                                          <td className="fw-semibold">
                                            {item?.parts_name}
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
