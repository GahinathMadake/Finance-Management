import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Dashboard
import DashboardLayout from "./pages/DashboardLayout";
import NotFound from "./pages/NotFound";

// Important Components
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/dashboard/Transactions";
import SetBudget from "./pages/dashboard/budget/SetBudget";
import Categories from "./pages/dashboard/Categories";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<Dashboard />}/>
          <Route path='transactions' element={<Transactions />}/>
          <Route path='budgets/set' element={<SetBudget />}/>
          <Route path='categories' element={<Categories />}/>
        </Route>

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
