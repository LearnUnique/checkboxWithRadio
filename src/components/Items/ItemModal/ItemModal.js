import React, { useState } from "react";

const ItemModal = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  console.log(product.options);
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div id="modal-dialog" className="zoom-anim-dialog ">
          <div className="small-dialog-header">
            <h3>{product.title}</h3>
          </div>
          <form id="form">
            <div className="content">
              <h5>Quantity</h5>
              <div className="numbers-row">
                <input
                  type="text"
                  id="qty_1"
                  defaultValue={quantity}
                  className="qty2 form-control"
                  name="quantity"
                />
                <div className="inc button_inc">+</div>
                <div className="dec button_inc">-</div>
              </div>
              <h5>Size</h5>
              <ul className="clearfix">
                {product.options.map((option, i) => {
                  return (
                    <li key={i + 1}>
                      <label className="container_radio">
                        {option.title}
                        <span>+ ${option.price}</span>
                        <input
                          type="radio"
                          required
                          defaultValue={option.price}
                          name={"size"}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {product.ingredients ? (
                <>
                  <h5>Extra Ingredients</h5>
                  <ul className="clearfix">
                    {product.ingredients.map((ingredient, i) => {
                      return (
                        <li key={i + 1}>
                          <label className="container_check">
                            {ingredient.title}
                            <span>+ ${ingredient.price}</span>
                            <input
                              type="checkbox"
                              defaultValue={ingredient.price}
                              name={ingredient.title}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="footer">
              <div className="row small-gutters">
                <div className="col-md-4">
                  <button
                    type="reset"
                    data-bs-dismiss="modal"
                    className="btn_1 outline full-width mb-mobile"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-8">
                  <button
                    type="submit"
                    name="submit"
                    className="btn_1 full-width"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
