import { useState, useEffect } from 'react';
import useAllData from '@/utils/dummyData'; // ✅ CORRECT
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

const CompanyManagement = () => {
  const { companies } = useAllData(); // ✅ backend data

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', plan: 'free', employees: 0 });

  // ✅ sync backend data → local state
  useEffect(() => {
    setData(companies || []);
  }, [companies]);

  const filtered = data.filter((c: any) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (!form.name) {
      toast.error('Name is required');
      return;
    }

    if (editId) {
      setData(data.map(c => c.id === editId ? { ...c, ...form } : c));
      toast.success('Company updated');
    } else {
      setData([
        ...data,
        {
          id: Date.now().toString(),
          ...form,
          status: 'active'
        }
      ]);
      toast.success('Company added');
    }

    setShowModal(false);
    setEditId(null);
    setForm({ name: '', plan: 'free', employees: 0 });
  };

  const handleEdit = (c: any) => {
    setEditId(c.id);
    setForm({
      name: c.name,
      plan: c.plan,
      employees: c.employees
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(c => c.id !== id));
    toast.success('Company removed');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Company Management</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search companies"
      />

      <table>
        <tbody>
          {filtered.map((c: any) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.plan}</td>
              <td>{c.employees}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyManagement;