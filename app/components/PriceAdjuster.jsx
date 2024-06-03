import { useState } from "react";

export const PriceAdjuster = ({ initialPrice = 120, currency = "ETH" }) => {
  const [price, setPrice] = useState(Number(initialPrice));

  // console.log("selectedOption:", currency);

  const updatePrice = (operation) => {
    const increment = 1;
    setPrice((prevPrice) => {
      const priceNumber = parseFloat(prevPrice); // Ensure prevPrice is a number

      if (operation === "increment") {
        return priceNumber + increment;
      } else if (operation === "decrement") {
        return Math.max(0, priceNumber - increment);
      }

      return prevPrice;
    });
  };

  return (
    <div className="px-[10px] lg:px-[22px] py-[14px] border border-primary-250 bg-primary flex gap-4 items-center justify-between w-full rounded-[20px]">
      <div className=" w-full">
        <button
          onClick={() => updatePrice("decrement")}
          className="text-base lg:text-lg font-bold text-white font-basement hover:text-secondary"
        >
          -
        </button>
        <input
          className=" mx-4 lg:hidden  appearance-none font-basement font-bold text-base lg:text-lg  text-grey-650 bg-[transparent] outline-none focus:outline-none text-white"
          type="number"
          placeholder="121"
          value={price}
          onChange={(e) => {
            const newPrice =
              e.target.value === "" ? 0 : parseFloat(e.target.value);
            if (!isNaN(newPrice)) setPrice(newPrice);
          }}
          style={{
            minWidth: "max-content",
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-[10px] relative">
        <input
          className="hidden lg:block appearance-none font-basement font-bold text-base lg:text-lg  text-grey-650 bg-[transparent] outline-none focus:outline-none text-white"
          type="number"
          placeholder="121"
          value={price}
          onChange={(e) => {
            const newPrice =
              e.target.value === "" ? 0 : parseFloat(e.target.value);
            if (!isNaN(newPrice)) setPrice(newPrice);
          }}
          style={{
            minWidth: "50px",
            width: `${(price.toString().length + 1) * 10}px`,
          }} // Set min-width and adjust width based on content length
        />
        <h1 className="text-base lg:text-lg  font-bold font-basement text-secondary">
          {currency}
        </h1>
      </div>
      <button
        onClick={() => updatePrice("increment")}
        className="text-base lg:text-lg  font-bold text-white font-basement hover:text-secondary"
      >
        +
      </button>
    </div>
  );
};
