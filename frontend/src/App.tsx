import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LandingPage from "@/pages/LandingPage";
import FeaturesPage from "@/pages/FeaturesPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import CompanyManagement from "@/pages/admin/CompanyManagement";
import AdminManagement from "@/pages/admin/AdminManagement";
import SubscriptionManagement from "@/pages/admin/SubscriptionManagement";
import UICustomization from "@/pages/admin/UICustomization";
import AdminSettings from "@/pages/admin/AdminSettings";

import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import EmployeeManagement from "@/pages/manager/EmployeeManagement";
import ManagerAttendance from "@/pages/manager/ManagerAttendance";
import ManagerHolidays from "@/pages/manager/ManagerHolidays";
import ManagerExpenses from "@/pages/manager/ManagerExpenses";
import ManagerPolicies from "@/pages/manager/ManagerPolicies";
import ManagerOffboarding from "@/pages/manager/ManagerOffboarding";
import ManagerSelfAttendance from "@/pages/manager/ManagerSelfAttendance";
import ManagerSelfLeaves from "@/pages/manager/ManagerSelfLeaves";
import ManagerSelfSalary from "@/pages/manager/ManagerSelfSalary";

import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import ClockInOut from "@/pages/employee/ClockInOut";
import EmployeeAttendance from "@/pages/employee/EmployeeAttendance";
import EmployeeLeaves from "@/pages/employee/EmployeeLeaves";
import EmployeeSalary from "@/pages/employee/EmployeeSalary";
import EmployeeHolidays from "@/pages/employee/EmployeeHolidays";
import EmployeePolicies from "@/pages/employee/EmployeePolicies";
import EmployeeExpenses from "@/pages/employee/EmployeeExpenses";

import ProfilePage from "@/pages/shared/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Super Admin */}
            <Route element={<ProtectedRoute allowedRoles={['superadmin']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/companies" element={<CompanyManagement />} />
              <Route path="/admin/admins" element={<AdminManagement />} />
              <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
              <Route path="/admin/customization" element={<UICustomization />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            {/* Manager */}
            <Route element={<ProtectedRoute allowedRoles={['manager']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager/employees" element={<EmployeeManagement />} />
              <Route path="/manager/attendance" element={<ManagerAttendance />} />
              <Route path="/manager/holidays" element={<ManagerHolidays />} />
              <Route path="/manager/expenses" element={<ManagerExpenses />} />
              <Route path="/manager/policies" element={<ManagerPolicies />} />
              <Route path="/manager/offboarding" element={<ManagerOffboarding />} />
              <Route path="/manager/my-attendance" element={<ManagerSelfAttendance />} />
              <Route path="/manager/my-leaves" element={<ManagerSelfLeaves />} />
              <Route path="/manager/my-salary" element={<ManagerSelfSalary />} />
              <Route path="/manager/profile" element={<ProfilePage />} />
            </Route>

            {/* Employee */}
            <Route element={<ProtectedRoute allowedRoles={['employee']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/employee/clock" element={<ClockInOut />} />
              <Route path="/employee/attendance" element={<EmployeeAttendance />} />
              <Route path="/employee/leaves" element={<EmployeeLeaves />} />
              <Route path="/employee/salary" element={<EmployeeSalary />} />
              <Route path="/employee/holidays" element={<EmployeeHolidays />} />
              <Route path="/employee/policies" element={<EmployeePolicies />} />
              <Route path="/employee/expenses" element={<EmployeeExpenses />} />
              <Route path="/employee/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
