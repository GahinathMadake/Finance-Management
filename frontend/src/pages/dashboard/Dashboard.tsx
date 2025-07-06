import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import userImage from "@/assets/userDash 1.png"
import {
  BarChart2,
  PieChart,
  Wallet,
  IndianRupee,
} from "lucide-react"
import axios from "axios"
import { ChartBarMonthly, ChartPieLabelList } from "./home/chart"

interface MonthlyChartData {
  month: string,
  budget: number,
  expenses: number,
}

interface CategoryChartData {
  category: string;
  amount: number;
  fill: string;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    categoriesTracked: 0,
    monthlyBudget: 0,
    recentTransactions: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Chart Data
  const [monthlyChartData, setMonthlyChartData] = useState<MonthlyChartData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryChartData[]>([]);
  const [loadingChartData, setIsLoadingChartData] = useState<boolean>(true)

  async function fetchChartData() {
    setIsLoadingChartData(true)
    console.log(loadingChartData);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/monthly-chart-data?months=6`
      )
      console.log(res);
      setMonthlyChartData(res.data);


      const res2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category-wise-expenses`);
      setCategoryData(res2.data);


    } catch (error) {
      console.error("Error fetching chart data", error)
      setMonthlyChartData([]) // fallback in case of failure
    } finally {
      setIsLoadingChartData(false)
    }
  }


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/dashboard-data`);
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    fetchChartData();
  }, []);

  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });


  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-gray-600 text-lg">
        <svg
          className="animate-spin h-8 w-8 text-green-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
        {/* Main Card */}
        <div className="border shadow-sm w-full lg:w-8/12 px-4 sm:px-5 py-6 rounded-md flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="w-full sm:w-7/12 flex flex-col gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Hi {"User"}, 👋<br />
              Ready to take control of your finances?
              <br />
              Let's visualize your money better.
            </h1>
            <p className="text-xs sm:text-sm">
              Track expenses, manage budgets, and gain financial insights with ease.
            </p>
            <Link to="/dashboard/transactions" className="w-fit">
              <Button className="bg-green-500 hover:bg-green-600">Track Spending</Button>
            </Link>
          </div>

          <div className="max-w-[300px] sm:w-6/12 flex justify-center sm:justify-end">
            <img
              src={userImage}
              alt="user"
              className="w-[200px] sm:w-[250px] md:w-[300px] max-h-[200px] object-contain"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="w-full lg:w-5/12 grid sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
            <IndianRupee className="text-green-600 w-8 h-8" />
            <p className="text-xl mt-2">₹{dashboardData?.totalExpenses || 0}</p>
            <p className="text-sm text-center">{currentMonthName} Expense</p>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
            <PieChart className="text-blue-500 w-8 h-8" />
            <p className="text-xl mt-2">{dashboardData?.categoriesTracked || 0}</p>
            <p className="text-sm text-center">Categories Tracked</p>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
            <Wallet className="text-yellow-500 w-8 h-8" />
            <p className="text-xl mt-2">₹{dashboardData?.monthlyBudget || 0}</p>
            <p className="text-sm text-center">{currentMonthName} Budget</p>
          </div>

          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
            <BarChart2 className="text-purple-600 w-8 h-8" />
            <p className="text-xl mt-2">{dashboardData?.recentTransactions}</p>
            <p className="text-sm text-center">{currentMonthName} Transactions</p>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Left Column (4/7 width on lg screens) */}
        <div className="w-full lg:col-span-3 space-y-4">
          <ChartBarMonthly data={monthlyChartData} />
          <ChartPieLabelList data={categoryData} />
        </div>

        {/* Right Column (3/7 width on lg screens) */}
        <div className="h-full w-full lg:col-span-4">
          
        </div>
      </div>

    </div>
  )
}

export default Dashboard;