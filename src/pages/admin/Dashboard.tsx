import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Megaphone, CalendarDays, MessageSquare, FileText,
  ClipboardList, Wallet, Users, TrendingUp, Images,
  ArrowRight, Activity, BookOpen,
} from "lucide-react";

const stats = [
  { label: "Announcements",  value: 12, icon: Megaphone,     to: "/admin/announcements", color: "from-amber-400 to-orange-500",  bg: "bg-amber-50",  text: "text-amber-700" },
  { label: "Calendar Events",value: 28, icon: CalendarDays,  to: "/admin/calendar",      color: "from-blue-500 to-indigo-500",   bg: "bg-blue-50",   text: "text-blue-700" },
  { label: "Inquiries",      value: 7,  icon: MessageSquare, to: "/admin/inquiries",     color: "from-violet-500 to-purple-500", bg: "bg-violet-50", text: "text-violet-700" },
  { label: "Notices",        value: 5,  icon: FileText,      to: "/admin/notices",       color: "from-emerald-500 to-teal-500",  bg: "bg-emerald-50",text: "text-emerald-700" },
  { label: "Applications",   value: 34, icon: ClipboardList, to: "/admin/admissions",    color: "from-primary to-orange-400",   bg: "bg-orange-50", text: "text-orange-700" },
  { label: "Fee Records",    value: 9,  icon: Wallet,        to: "/admin/fees",          color: "from-gold to-amber-400",       bg: "bg-yellow-50", text: "text-yellow-700" },
];

const recentActivity = [
  { text: "New inquiry from Priya Sharma",    time: "2 min ago",  icon: MessageSquare, color: "bg-violet-100 text-violet-600" },
  { text: "Admission application submitted",  time: "15 min ago", icon: ClipboardList, color: "bg-orange-100 text-orange-600" },
  { text: "Notice published: Exam Schedule",  time: "1 hr ago",   icon: FileText,      color: "bg-emerald-100 text-emerald-600" },
  { text: "Calendar event added: PTM",        time: "3 hrs ago",  icon: CalendarDays,  color: "bg-blue-100 text-blue-600" },
  { text: "Announcement updated",             time: "Yesterday",  icon: Megaphone,     color: "bg-amber-100 text-amber-600" },
];

const quickActions = [
  { label: "New Announcement",   to: "/admin/announcements", icon: Megaphone,     color: "from-amber-400 to-orange-500" },
  { label: "Add Event",          to: "/admin/calendar",      icon: CalendarDays,  color: "from-blue-500 to-indigo-500" },
  { label: "Publish Notice",     to: "/admin/notices",       icon: FileText,      color: "from-emerald-500 to-teal-500" },
  { label: "View Inquiries",     to: "/admin/inquiries",     icon: MessageSquare, color: "from-violet-500 to-purple-500" },
  { label: "Update Fees",        to: "/admin/fees",          icon: Wallet,        color: "from-gold to-amber-400" },
  { label: "View Applications",  to: "/admin/admissions",    icon: Users,         color: "from-primary to-orange-400" },
  { label: "Manage Gallery",     to: "/admin/gallery",       icon: Images,        color: "from-pink-500 to-rose-500" },
  { label: "Academics",          to: "/admin/academics",     icon: BookOpen,      color: "from-teal-500 to-cyan-500" },
];

const AdminDashboard = () => (
  <div className="p-6 md:p-8 space-y-8">

    {/* ── Header ── */}
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin 🙏</p>
      </div>
      <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/8 border border-primary/20 rounded-xl px-4 py-2.5 font-medium">
        <TrendingUp className="h-4 w-4" />
        Academic Year 2025–26
      </div>
    </motion.div>

    {/* ── Stats grid ── */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, to, color, bg, text }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <Link
            to={to}
            className="group relative overflow-hidden flex flex-col bg-card rounded-2xl border border-gold/20 p-5 hover:shadow-warm hover:-translate-y-0.5 transition-all duration-200 block"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />
            <div className="flex items-start justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
                <Icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
            <div className="font-display text-3xl font-bold text-secondary">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </Link>
        </motion.div>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      {/* ── Recent Activity ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-card rounded-2xl border border-gold/20 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
            <Activity className="h-4 w-4" />
          </div>
          <h2 className="font-display font-semibold text-secondary text-sm">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-gold/8">
          {recentActivity.map(({ text, time, icon: Icon, color }, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors"
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${color} mt-0.5`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/80 leading-snug">{text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-card rounded-2xl border border-gold/20 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
            <TrendingUp className="h-4 w-4" />
          </div>
          <h2 className="font-display font-semibold text-secondary text-sm">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2.5">
          {quickActions.map(({ label, to, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.38 + i * 0.05 }}
            >
              <Link
                to={to}
                className="group flex items-center gap-2.5 p-3 rounded-xl border border-gold/15 bg-background/60 hover:bg-primary/5 hover:border-primary/25 transition-all duration-200"
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors leading-tight">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  </div>
);

export default AdminDashboard;
