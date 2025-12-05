
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-3">
          <a href="/dashboard" className="block">Home</a>
          <a href="/dashboard/users" className="block">Users</a>
          <a href="/dashboard/settings" className="block">Settings</a>
        </nav>
      </aside>


      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
