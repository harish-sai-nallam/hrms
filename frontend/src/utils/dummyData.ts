import { useEffect, useState } from "react";

export default function useAllData() {
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [offboarding, setOffboarding] = useState([]);
  const [payslip, setPayslip] = useState(null);

  const fetchSafe = async (url: string, setter: any) => {
    try {
      const res = await fetch(url, {
        credentials: "include"
      });
      const data = await res.json();
      setter(data);
    } catch {
      setter([]);
    }
  };

  useEffect(() => {
    fetchSafe("http://localhost:5000/api/companies", setCompanies);
    fetchSafe("http://localhost:5000/api/employees", setEmployees);
    fetchSafe("http://localhost:5000/api/attendance", setAttendance);
    fetchSafe("http://localhost:5000/api/leaves", setLeaves);
    fetchSafe("http://localhost:5000/api/holidays", setHolidays);

    fetchSafe("http://localhost:5000/api/expenses", setExpenses);
    fetchSafe("http://localhost:5000/api/policies", setPolicies);
    fetchSafe("http://localhost:5000/api/offboarding", setOffboarding);

    // single object
    fetch("http://localhost:5000/api/payslip", { credentials: "include" })
      .then(res => res.json())
      .then(setPayslip)
      .catch(() => setPayslip(null));

  }, []);

  return {
    companies,
    employees,
    attendance,
    leaves,
    holidays,
    expenses,
    policies,
    offboarding,
    payslip
  };
}