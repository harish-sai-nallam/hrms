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
  const [payslip, setPayslip] = useState<Record<string, number> | null>(null);

  const fetchSafe = async (url: string, setter: any) => {
    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) { setter([]); return; }
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error("Fetch error:", url, err);
      setter([]);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([
        fetchSafe("http://localhost:5000/api/companies", setCompanies),
        fetchSafe("http://localhost:5000/api/employees", setEmployees),
        fetchSafe("http://localhost:5000/api/attendance", setAttendance),
        fetchSafe("http://localhost:5000/api/leaves", setLeaves),
        fetchSafe("http://localhost:5000/api/holidays", setHolidays),
        fetchSafe("http://localhost:5000/api/expenses", setExpenses),
        fetchSafe("http://localhost:5000/api/policies", setPolicies),
        fetchSafe("http://localhost:5000/api/offboarding", setOffboarding),
      ]);

      try {
        const res = await fetch("http://localhost:5000/api/payslip", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setPayslip(data);
        } else {
          setPayslip(null);
        }
      } catch {
        setPayslip(null);
      }
    };

    loadAll();
  }, []);

  return {
    companies,
    employees,
    attendance,
    attendanceRecords: attendance, // alias — ManagerAttendance uses this key
    leaves,
    holidays,
    expenses,
    policies,
    offboarding,
    payslip,
  };
}
