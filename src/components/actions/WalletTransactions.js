import { useEffect } from "react";
import dayjs from "dayjs";

const UserActions = ({ transactions, depositFunds }) => {
  useEffect(() => {}, []);

  return (
    <>
      {/* //Get Transactions section */}

      <div className="wallet-transactions mt-30">
        {transactions &&
          transactions.map((transaction, index) => {
            return (
              <div className="trans-list mb-20" key={index}>
                <div className="trans-list__icon">
                  {transaction.currency === "USD" ? "$" : "₦"}
                </div>
                <div className="trans-list__text">
                  <p className="mb-10">
                    <b>{transaction.drcr === "CR" ? "Credit" : "Debit"}</b>
                  </p>
                  <p className="col-grey">{transaction.funding_method}</p>
                </div>
                <div className="trans-list__text__date">
                  {dayjs(transaction?.created_at).format("DD/MM/YYYY")}
                </div>
              </div>
            );
          })}

        {!transactions?.length && (
          <div>
            <p className="text-center col-grey mt-30">
              Sorry you have no transactions
            </p>

            <button
              className="button-class mt-30"
              onClick={() => depositFunds()}
            >
              Fund wallet
            </button>
          </div>
        )}
      </div>

      {/* /// */}
    </>
  );
};

export default UserActions;
