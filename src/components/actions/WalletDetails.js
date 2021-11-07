import { useEffect } from "react";
import dayjs from "dayjs";

const UserActions = ({ walletDetails }) => {
  useEffect(() => {}, []);

  return (
    <>
      {/* //Wallet details section */}
      <div className="wallet-details mt-30">
        <ul>
          <li>
            Balance : {walletDetails?.currency + " " + walletDetails?.balance}
          </li>
          <li>Email : {walletDetails?.customer_email}</li>
          <li>Status : {walletDetails?.status}</li>
          <li>
            Created :{dayjs(walletDetails?.created_at).format("DD/MM/YYYY")}
          </li>
        </ul>
      </div>

      {/* /// */}
    </>
  );
};

export default UserActions;
