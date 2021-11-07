import "animate.css";
import { useEffect, useState } from "react";
import "./App.css";
import CardContainer from "./components/CardContainer";
import EmailForm from "./components/EmailForm";
import UserActions from "./components/UserActions";
import dayjs from "dayjs";

function App() {
  const [countDown, setIsCountDown] = useState(0);
  const [walletData, setWalletData] = useState("");

  useEffect(() => {
    let setTime = localStorage.getItem("userIsSetDate");
    setTime = JSON.parse(setTime);
    const nowTime = dayjs(new Date());
    const savedTime = dayjs(setTime);
    if (setTime) {
      setIsCountDown(nowTime.diff(savedTime) * 0.001);
    }
    let walletDetails = localStorage.getItem("walletData");
    walletDetails = JSON.parse(walletDetails);
    walletDetails && setWalletData(walletDetails.data);
    if(countDown > 3600){
      localStorage.removeItem('walletData')
    }
  }, []);


  const showMenu = (walletDetail) => {
    setWalletData(walletDetail)
  };

  return (
    <div className="App">
      <header className="App-header">
        <center>
          <img
            alt="GetWallets"
            height="80"
            className="mt-30 rem-3"
            src="https://files.readme.io/e00a6a5-GetWallets_icon_WHITE.svg"
          />
        </center>
        {!walletData || countDown > 3600  ? (
          <p className="text-center col-white">
            Hello there! let's create your wallet
       
          </p>
        ) : (
          <p className="text-center col-white">
            Hello
            <b className="col-green">
            {' '+walletData.customer_email +'!'+ ' '}
              </b>
              welcome to get wallets
            
          </p>
        )}

        <div className="card-cover">
          <CardContainer countDown={countDown}>
            {countDown > 3600 || !walletData ? (
              <EmailForm  showMenu={showMenu} />
            ) : (
              <UserActions countDown={countDown} />
            )}
          </CardContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
