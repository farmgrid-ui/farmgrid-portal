import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserInvestmentsRequest } from "../../../redux/action";
import { DashboardNav } from "../../../Components/navbar";

const Home = () => {
  const {
    getUserInvestmentsSuccess,
    investments,
    getUserInvestmentsError,
    getUserInvestmentsLoading,
    user,
    isLoggedIn,
    token,
  } = useSelector((state) => {
    const {
      success: { getUserInvestments: getUserInvestmentsSuccess },
      errors: { getUserInvestments: getUserInvestmentsError },
    } = state.ajaxStatuses;

    const { getUserInvestmentsLoading } = state.loadingIndicator;

    const { user, token, isLoggedIn } = state.userData;
    const { farms } = state.farmData;
    const { investments } = state.investmentData;

    return {
      getUserInvestmentsSuccess,
      getUserInvestmentsError,
      getUserInvestmentsLoading,
      investments,
      isLoggedIn,
      token,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInvestmentsRequest(token));
  }, [getUserInvestmentsRequest]);

  const [invmLength, setInvmLength] = useState(0);

  useEffect(() => {
    if (getUserInvestmentsError) {
      toast.error(getUserInvestmentsError, {
        duration: 3000,
      });
    }

    if (!getUserInvestmentsLoading) {
      const invesmentLength = investments.length - 1;
      setInvmLength(invesmentLength);
    }
  }, [getUserInvestmentsError]);

  return (
    <div>
      <DashboardNav />
      <section className="container">
        <h1 className="invest-heading">My Farms</h1>

        {!getUserInvestmentsLoading && (
          <div className="investemt-table">
            <table id="customers">
              <thead>
                <tr>
                  <th>Farm</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>ROI%</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {investments.map((_, index) => (
                  <tr
                    className={invmLength == index && "last-child"}
                    key={index}
                  >
                    <td>{_.farm.farmName}</td>
                    <td>13-01-2022</td>
                    <td>13-03-2022</td>
                    <td>{_.farm.returnOfInvestment}%</td>
                    <td>
                      <div
                        className={
                          _.status == "Active"
                            ? "table-btn-active"
                            : "table-btn-pending"
                        }
                      >
                        {_.status}
                      </div>
                    </td>
                    <td>
                      <div className="table-btn-active">View</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
