import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <Link className="text-blue-500" href="/dashboard/users">Users</Link>
      </div>
    </div>
  );
}
