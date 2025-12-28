import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";

const styles = {
  downloadBtn: `


    cursor-pointer
    flex items-center gap-2
    px-3 py-2
    rounded-md
    text-sm font-medium
    text-white
    bg-white/15
    border border-white/20
    backdrop-blur-md
    transition-all
    hover:bg-white/25
    hover:border-white/30
    hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]`,}
const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
// download task report
const handleDownloadReport = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.REPORTS.EXPORT_USERS,
      {
        responseType: "blob",
      }
    );

    // Create a URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "Error downloading expense details:",
      error
    );
    toast.error(
      "Failed to download expense details. Please try again."
    );
  }
};


  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-5 mx-4 md:mx-5 lg:mr-8
">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-[24px] md:text-[24px] font-medium text-white/95">
            Team Members
          </h2>

          <button
            className={ styles.downloadBtn }
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
