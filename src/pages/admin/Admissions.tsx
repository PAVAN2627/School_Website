import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, X } from "lucide-react";

type Status = "Pending" | "Reviewed" | "Accepted" | "Rejected";

interface Application {
  id: number; studentName: string; grade: string; parentName: string;
  email: string; phone: string; date: string; status: Status;
}

const seed: Application[] = [
  { id: 1, studentName: "Arjun Mehta", grade: "Class VI", parentName: "Suresh Mehta", email: "suresh@example.com", phone: "9876543210", date: "2026-01-12", status: "Pending" },
  { id: 2, studentName: "Priya Singh", grade: "Class IX", parentName: "Kavita Singh", email: "kavita@example.com", phone: "9123456789", date: "2026-01-10", status: "Reviewed" },
  { id: 3, studentName: "Rohan Patel", grade: "Class I", parentName: "Amit Patel", email: "amit@example.com", phone: "9988776655", date: "2026-01-08", status: "Accepted" },
];

const STATUS_COLORS: Record<Status, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const AdminAdmissions = () => {
  const [apps, setApps] = useState<Application[]>(seed);
  const [selected, setSelected] = useState<Application | null>(null);

  const updateStatus = (id: number, status: Status) => {
    setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  return (
    <AdminPageShell title="Admissions" subtitle="View and manage student admission applications">
      <div className="grid md:grid-cols-4 gap-4 mb-2">
        {(["Pending", "Reviewed", "Accepted", "Rejected"] as Status[]).map(s => (
          <div key={s} className="bg-card rounded-xl border border-gold/15 p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{apps.filter(a => a.status === s).length}</div>
            <div className="text-sm text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-gold/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-gold/15">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Grade</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {apps.map(a => (
              <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium">{a.studentName}</div>
                  <div className="text-xs text-muted-foreground">{a.parentName}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.grade}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => setSelected(a)} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Eye className="h-3.5 w-3.5" /></button>
                    <button onClick={() => updateStatus(a.id, "Accepted")} className="p-1.5 rounded hover:bg-green-50 text-muted-foreground hover:text-green-600"><Check className="h-3.5 w-3.5" /></button>
                    <button onClick={() => updateStatus(a.id, "Rejected")} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-md shadow-warm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-secondary">Application Details</h2>
              <button onClick={() => setSelected(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["Student", selected.studentName], ["Grade", selected.grade],
                ["Parent", selected.parentName], ["Email", selected.email],
                ["Phone", selected.phone], ["Applied On", selected.date],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => updateStatus(selected.id, "Accepted")} className="bg-green-600 hover:bg-green-700 text-white flex-1">Accept</Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus(selected.id, "Rejected")} className="text-red-500 border-red-200 flex-1">Reject</Button>
            </div>
          </div>
        </div>
      )}
    </AdminPageShell>
  );
};

export default AdminAdmissions;
