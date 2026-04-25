import { Link } from "react-router-dom";
import { Megaphone, CalendarDays, MessageSquare, FileText, ClipboardList, Wallet, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "Announcements", value: 12, icon: Megaphone, to: "/admin/announcements", color: "bg-orange-100 text-orange-600" },
  { label: "Calendar Events", value: 28, icon: CalendarDays, to: "/admin/calendar", color: "bg-blue-100 text-blue-600" },
  { label: "Inquiries", value: 7, icon: MessageSquare, to: "/admin/inquiries", color: "bg-green-100 text-green-600" },
  { label: "Notices", value: 5, icon: FileText, to: "/admin/notices", color: "bg-purple-100 text-purple-600" },
  { label: "Applications", value: 34, icon: ClipboardList, to: "/admin/admissions", color: "bg-yellow-100 text-yellow-600" },
  { label: "Fee Records", value: 9, icon: Wallet, to: "/admin/fees", color: "bg-pink-100 text-pink-600" },
];

const recentActivity = [
  { text: "New inquiry from Priya Sharma", time: "2 min ago", icon: MessageSquare },
  { text: "Admission application submitted", time: "15 min ago", icon: ClipboardList },
  { text: "Notice published: Exam Schedule", time: "1 hr ago", icon: FileText },
  { text: "Calendar event added: PTM", time: "3 hrs ago", icon: CalendarDays },
  { text: "Announcement updated", time: "Yesterday", icon: Megaphone },
];

const AdminDashboard = () => (
  <div className="p-6 md:p-8 space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-gold/20 rounded-lg px-3 py-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        Academic Year 2025–26
      </div>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, to, color }) => (
        <Link
          key={label}
          to={to}
          className="bg-card rounded-xl border border-gold/15 p-5 hover:shadow-warm hover:border-gold/40 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="font-display text-3xl font-bold text-secondary mt-1">{value}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-gold/15 p-5">
        <h2 className="font-display font-semibold text-secondary mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.map(({ text, time, icon: Icon }, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/80 truncate">{text}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-gold/15 p-5">
        <h2 className="font-display font-semibold text-secondary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "New Announcement", to: "/admin/announcements", icon: Megaphone },
            { label: "Add Event", to: "/admin/calendar", icon: CalendarDays },
            { label: "Publish Notice", to: "/admin/notices", icon: FileText },
            { label: "View Inquiries", to: "/admin/inquiries", icon: MessageSquare },
            { label: "Update Fees", to: "/admin/fees", icon: Wallet },
            { label: "View Applications", to: "/admin/admissions", icon: Users },
          ].map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 p-3 rounded-lg border border-gold/15 hover:bg-primary/5 hover:border-primary/30 transition-all text-sm text-foreground/80"
            >
              <Icon className="h-4 w-4 text-primary shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
