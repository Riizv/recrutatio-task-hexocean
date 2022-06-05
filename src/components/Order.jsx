import "./Order.scss";
import { useState, useRef } from "react";

const FIELDS = {
  pizza: function () {
    return (
      <>
        <div>
          <label htmlFor="no_of_slices">Number of slices: </label>
        </div>
        <div>
          <input type="number" name="no_of_slices" id="no_of_slices" required />
        </div>
        <div>
          <label htmlFor="diameter">Diameter: </label>
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            name="diameter"
            id="diameter"
            required
          />
        </div>
      </>
    );
  },
  soup: () => {
    return (
      <>
        <div>
          <label htmlFor="spiciness_scale">Spiciness scale: </label>
        </div>
        <div>
          <input
            type="number"
            name="spiciness_scale"
            id="spiciness_scale"
            min="1"
            max="10"
            required
          />
        </div>
      </>
    );
  },
  sandwich: () => {
    return (
      <>
        <div>
          <label htmlFor="slices_of_bread">Slices of bread: </label>
        </div>
        <div>
          <input
            type="number"
            name="slices_of_bread"
            id="slices_of_bread"
            required
          />
        </div>
      </>
    );
  },
};

function Order() {
  const [dish, setDish] = useState("pizza");
  const formRef = useRef();

  const handleChange = (e) => {
    setDish(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);

    console.log(data);

    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
  };

  const Field = FIELDS[dish];

  return (
    <div>
      <div className="form-container">
        <div className="form-wrapper">
          <form action="" method="POST" onSubmit={handleSubmit} ref={formRef}>
            <div>
              <label htmlFor="name">Name: </label>
            </div>
            <div>
              <input type="text" name="name" id="name" required />
            </div>
            <div>
              <label htmlFor="preparation_time">Preparation time: </label>
            </div>
            <div>
              <input
                type="time"
                step="1"
                name="preparation_time"
                id="preaparation_time"
                required
              />
            </div>
            <div>
              <label htmlFor="dish">Dish type : </label>
            </div>
            <div>
              <select
                name="dish"
                id="dish"
                required
                value={dish}
                onChange={handleChange}
              >
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
              </select>
            </div>

            <Field />

            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
