import React, { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import "./items.css";
const Items = () => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setData]);
  console.log(data);
  return (
    <div className="container">
      <div className="row">
        {loading
          ? "Loading"
          : data.map((item) => {
              return (
                <div className="col-sm-6" key={item.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        {item.description?.slice(0, 100)}
                      </p>

                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="btn btn-primary"
                      >
                        Add
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <ItemModal product={item} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Items;
