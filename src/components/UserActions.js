import { useEffect, useState } from "react";
import api from "../api";
import dayjs from "dayjs";
import axiosAlias from "../http";
import Loader from "./Loader";

import WalletView from './actions/WalletDetails'
import TransactionsView from './actions/WalletTransactions'
import FundWalletView from './actions/FundWallet'

const UserActions = ({ countDown }) => {
  useEffect(() => {}, []);

  const [walletDetails, setWalletDetails] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [walletId, setWalletId] = useState("");
  const [currency, setCurrency] = useState("");
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState("details");

  useEffect(() => {
    let walletDetails = localStorage.getItem("walletData");
    walletDetails = JSON.parse(walletDetails);

    walletDetails && setWalletId(walletDetails.data.wallet_id);
    walletDetails && setWalletDetails(walletDetails.data);
    if (!walletId && countDown < 3600) {
      getWallet();
    }
  }, []);

  const getTransactionHistory = () => {
    setLoader(true);
    setActive("transaction");
    axiosAlias
      .get(api.getTransactions + `${walletId}`)
      .then(function (response) {
        console.log(response.data);
        setTransactions(response.data.data);
        setLoader(false);
      })

      .catch(function (error) {
        console.error(error, "pop");
        setLoader(false);
      });
  };

  const depositFunds = ()=>{

    setActive("fund")
  }

  const getWallet = () => {
    setActive("details");
    if (walletId)
      axiosAlias
        .get(api.wallet + `${walletId}`)
        .then(function (response) {
          console.log(response.data, "get wallet data");
          if (walletId) {
            setWalletDetails(response.data.data);
          }
          localStorage.setItem("walletData", JSON.stringify(response.data));
        })

        .catch(function (error) {
          // console.error(error, "pop");
        });
  };

  const fundWallet = () => {
    setLoader(true);

    const data = {
      wallet_id: walletId,
      currency: currency,
      amount: amount,
    };

    axiosAlias
      .post(api.fundWallet, data)
      .then(function (response) {
        setActive("transaction");
        setLoader(false);
        setAmount("");
        getTransactionHistory();
      })

      .catch(function (error) {
        // console.error(error, "pop");
        setLoader(false);
      });
  };

  return (
    <div className="width-100">
      <div className="user-actions">
        <button
          className={`user-actions__btn 
        
        ${active === "details" ? "action-active" : ""}
        
        `}
          onClick={() => getWallet()}
        >
          Wallet details
        </button>
        <button
          className={`user-actions__btn 
        
         ${active === "transaction" ? "action-active" : ""}
         
         `}
          onClick={() => getTransactionHistory()}
        >
          {" "}
          Transactions
        </button>
        <button
          className={`user-actions__btn 
        
        ${active === "fund" ? "action-active" : ""}
        
        `}
          onClick={() => setActive("fund")}
        >
          Fund wallet
        </button>
      </div>



      {active === "details" ? (
      <WalletView
      walletDetails={walletDetails}
      />
      ) : null}


      {active === "transaction" && !loader ? (
       <TransactionsView
       transactions={transactions}
       depositFunds={depositFunds}
       />
      ) : null}


      {active === "fund" && !loader ? (
      <FundWalletView
      setAmount={setAmount}
      amount={amount}
      fundWallet={fundWallet}
      setCurrency={setCurrency}
      />
      ) : null}


      {loader ? <Loader /> : null}
    </div>
  );
};

export default UserActions;
