import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_25%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-6 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <main className="space-y-6">
        <TopBar />
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
