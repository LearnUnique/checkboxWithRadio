import React, { useState } from "react";

const ItemModal = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [productInfo, setProductInfo] = useState({});

  const removeObject = (item, property) => {
    const { options, ...rest } = productInfo;
    if (property === "size") {
      return {
        options: options.filter((el) => {
          return el.size !== item;
        }),
      };
    }
    if (property === "title") {
      return {
        ...rest,
        options: options.filter((element) => {
          return element.title !== item;
        }),
      };
    }
  };
  // OPTION
  const setOptions = (e, product, option) => {
    console.log("set options");
    setProductInfo((prevValue) => {
      const newValue = prevValue ? { ...prevValue } : {};
      const isExist = newValue.title === product.title;

      if (isExist) {
        console.log("exist");
        const isSizeExist = newValue.options.find((element) => element.size);
        if (isSizeExist) {
          console.log("size exist");
          const newSize = {
            [e.target.name]: option.title,
            price: Number(option.price),
          };
          const removeObj = removeObject(isSizeExist.size, "size");
          newValue.options = [...removeObj.options, newSize];
          return newValue;
        } else {
          const newOption = {
            [e.target.name]: option.title,
            price: Number(option.price),
          };
          newValue.options = [...newValue.options, newOption];
          return newValue;
        }
      } else {
        console.log("not exist");
        return {
          id: product.id,
          title: product.title,
          quantity: 1,
          price: product.price,
          options: [
            { [e.target.name]: option.title, price: Number(option.price) },
          ],
        };
      }
    });
  };

  const setCheckbox = (e, product, option) => {
    console.log("set checkbox");
    // DESTRUCTING
    const { name, value, checked } = e.target;
    console.log(name);
    if (checked) {
      if (option) {
        setOptions(e, product, option);
      } else {
        // CHECKBOX
        setProductInfo((prevValue) => {
          const newValue = prevValue ? { ...prevValue } : {};
          const isExistTitle = newValue.title === product.title;

          if (isExistTitle) {
            const newVal = { title: name, price: value };
            newValue.options = [...newValue.options, newVal];
            return newValue;
          } else {
            return {
              id: product.id,
              title: product.title,
              quantity: 1,
              price: product.price,
              options: [{ title: name, price: Number(value) }],
            };
          }
        });
      }
    } else {
      const findItem = productInfo.options.find((e) => e.title === name);
      const newItemValues = removeObject(findItem.title, "title");
      setProductInfo(newItemValues);
    }
  };
  const incrementQuantity = (e, product, quantity) => {
    setQuantity(quantity + 1);
    handleQuantity(e, product, quantity + 1);
  };
  const decrementQuantity = (e, product, quantity) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleQuantity(e, product, quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const handleQuantity = (e, product, quantity) => {
    console.log("quantity");
    setProductInfo((prevValue) => {
      const newValue = prevValue ? { ...prevValue } : {};
      const isExist = product.title === newValue.title;
      console.log("quantity");

      if (isExist) {
        console.log("quantity exist");
        newValue.quantity = quantity;
        return newValue;
      } else {
        console.log("quantity dont exist");
        return {
          id: product.id,
          title: product.title,
          quantity: quantity,
          price: product.price,
          options: [],
        };
      }
    });
  };
  console.log(productInfo);
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
                  onChange={() => incrementQuantity()}
                  value={quantity}
                  className="qty2 form-control"
                  name="quantity"
                />
                <div
                  className="inc button_inc"
                  onClick={(e) => incrementQuantity(e, product, quantity)}
                >
                  +
                </div>
                <div
                  className="dec button_inc"
                  onClick={(e) => decrementQuantity(e, product, quantity)}
                >
                  -
                </div>
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
                          onChange={(e) => setOptions(e, product, option)}
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
                              onChange={(e) => setCheckbox(e, product, false)}
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
