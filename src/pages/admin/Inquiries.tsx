import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { X, MailOpen, Mail } from "lucide-react";

interface Inquiry { id: number; name: string; email: string; subject: string; message: string; date: string; read: boolean; }

const seed: Inquiry[] = [
  { id: 1, name: "Sunita Verma", email: "sunita@example.com", subject: "Admission Query", message: "I would like to know about the admission process for Class III.", date: "2026-01-14", read: false },
  { id: 2, name: "Rajesh Kumar", email: "rajesh@example.com", subject: "Fee Structure", message: "Can you please share the fee structure for Class X?", date: "2026-01-13", read: false },
  { id: 3, name: "Meena Joshi", email: "meena@example.com", subject: "Transport Facility", message: "Does the school provide bus service from Sector 12?", date: "2026-01-11", read: true },
];

const AdminInquiries = () => {
  const [items, setItems] = useState<Inquiry[]>(seed);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const markRead = (id: number) => setItems(items.map(i => i.id === id ? { ...i, read: true } : i));
  const handleOpen = (inq: Inquiry) => { markRead(inq.id); setSelected({ ...inq, read: true }); };

  const unread = items.filter(i => !i.read).length;

  return (
    <AdminPageShell title="Inquiries" subtitle={`${unread} unread inquiry${unread !== 1 ? "s" : ""}`}>
      <div className="space-y-4">
        <div className="space-y-3 md:hidden">
          {items.map(inq => (
            <button
              key={inq.id}
              type="button"
              onClick={() => handleOpen(inq)}
              className={`w-full text-left rounded-3xl border border-gold/15 bg-card p-4 shadow-sm transition hover:shadow-md ${!inq.read ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl ${inq.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                    {inq.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className={`${!inq.read ? "font-semibold text-secondary" : "font-medium text-secondary"} truncate`}>{inq.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{inq.email}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{inq.date}</span>
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold text-secondary truncate">{inq.subject}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{inq.message}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${inq.read ? "bg-muted/70 text-muted-foreground" : "bg-primary/15 text-primary"}`}>
                  {inq.read ? "Read" : "Unread"}
                </span>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setItems(items.filter(i => i.id !== inq.id)); }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete inquiry"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </button>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto rounded-xl border border-gold/15 bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-gold/15">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8" />
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">From</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {items.map(inq => (
                <tr key={inq.id} className={`hover:bg-muted/30 transition-colors cursor-pointer ${!inq.read ? "bg-primary/5" : ""}`} onClick={() => handleOpen(inq)}>
                  <td className="px-4 py-3">
                    {inq.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`${!inq.read ? "font-semibold" : "font-medium"}`}>{inq.name}</div>
                    <div className="text-xs text-muted-foreground">{inq.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{inq.subject}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{inq.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={e => { e.stopPropagation(); setItems(items.filter(i => i.id !== inq.id)); }} className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-lg shadow-warm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-secondary">{selected.subject}</h2>
              <button onClick={() => setSelected(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="text-sm space-y-1">
              <div><span className="text-muted-foreground">From: </span><span className="font-medium">{selected.name}</span> &lt;{selected.email}&gt;</div>
              <div><span className="text-muted-foreground">Date: </span>{selected.date}</div>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 text-sm text-foreground/80 leading-relaxed">{selected.message}</div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              Reply via Email
            </a>
          </div>
        </div>
      )}
    </AdminPageShell>
  );
};

export default AdminInquiries;
