import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/admin/AdminLayout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Academics from "./pages/Academics.tsx";
import Admissions from "./pages/Admissions.tsx";
import Calendar from "./pages/Calendar.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Notices from "./pages/Notices.tsx";
import Fees from "./pages/Fees.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminAnnouncements from "./pages/admin/Announcements.tsx";
import AdminCalendarEvents from "./pages/admin/CalendarEvents.tsx";
import AdminAbout from "./pages/admin/About.tsx";
import AdminAcademics from "./pages/admin/Academics.tsx";
import AdminAdmissions from "./pages/admin/Admissions.tsx";
import AdminInquiries from "./pages/admin/Inquiries.tsx";
import AdminNotices from "./pages/admin/Notices.tsx";
import AdminFees from "./pages/admin/Fees.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/fees" element={<Fees />} />
            </Route>
            {/* User Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              <Route path="/admin/calendar" element={<AdminCalendarEvents />} />
              <Route path="/admin/about" element={<AdminAbout />} />
              <Route path="/admin/academics" element={<AdminAcademics />} />
              <Route path="/admin/admissions" element={<AdminAdmissions />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="/admin/notices" element={<AdminNotices />} />
              <Route path="/admin/fees" element={<AdminFees />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
