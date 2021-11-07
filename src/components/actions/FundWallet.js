import { useEffect } from "react";

const FundWallet = ({ setAmount, amount, fundWallet, setCurrency }) => {
  useEffect(() => {}, []);

  return (
    <>
      {/* //Fund wallet section */}

      <div className="wallet-transactions mt-30">
        <select
          className="input-class mb-10"
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option>Select Currency</option>
          <option value={"NGN"}>NGN</option>
          <option value={"USD"}>USD</option>
        </select>
        <input
          type="number"
          className="input-class mb-10"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button className="button-class" onClick={() => fundWallet()}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FundWallet;
