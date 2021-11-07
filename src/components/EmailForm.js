import { useEffect, useState } from "react";
import api from "../api";
import axiosAlias from "../http";
import Loader from "./Loader";

const EmailForm = ({ showMenu, countDown }) => {
  useEffect(() => {
    if (countDown > 3600) {
      localStorage.removeItem("walletData");
    }
  }, [countDown]);

  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const createWallet = () => {
    let data = {
      customer_email: email,
    };
    localStorage.removeItem("userIsSetDate");

    setLoader(true);
    axiosAlias
      .post(api.wallet, data)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("walletData", JSON.stringify(response.data));
        showMenu(response.data.data);

        localStorage.setItem("userIsSetDate", JSON.stringify(new Date()));
        setLoader(false);
      })

      .catch(function (error) {
        console.error(error, "pop");
        setLoader(false);
      });
  };

  return (
    <div className="width-100">
      {loader ? (
        <Loader />
      ) : (
        <>
          <input
            type="email"
            className="input-class mb-10"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            autoFocus
          />

          <button className="button-class" onClick={() => createWallet()}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default EmailForm;
