import React, { useState, useEffect, useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import { addThousandsSeparator } from "../../utils/helper.js";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable.jsx";
import CustomPieChart from "../../components/Charts/CustomPieChart.jsx";
import CustomBarChart from "../../components/Charts/CustomBarChart.jsx";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    setPieChartData([
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
     return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Header Card */}
      <div className="bg-white/5 p-8 backdrop-blur-md border border-white/20 transition-all rounded-lg shadow-sm mb-6 mt-5 mr-5">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl text-white/90">
            Good Morning! {user?.name}
          </h2>

          <p className="text-xs md:text-[13px] text-white/90 mt-1.5">
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>

        <div className="mt-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-[#0d6efd]"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] bg-white/5 backdrop-blur-md border border-white/20 py-8 px-6 rounded-2xl shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-white/90">Task Distribution</h5>
            </div>

            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>

        <div>
          <div className="hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] bg-white/5 backdrop-blur-md border border-white/20 p-8 rounded-2xl mr-5 transition-all">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-white/90">
                Task Priority Levels
              </h5>
            </div>

            <CustomBarChart data={barChartData} />
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="md:col-span-2">
          <div className="bg-white/5 p-4 rounded-lg mr-5 backdrop-blur-md border border-white/20">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold text-white/90">
                Recent Tasks
              </h5>

              <button
                className="text-white/90 flex items-center gap-2 font-semibold bg-white/10 rounded-md px-3 py-1 cursor-pointer"
                onClick={onSeeMore}
              >
                See All <LuArrowRight />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
