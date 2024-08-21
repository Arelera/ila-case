import DashboardLayout from '../layouts/DashboardLayout'

export default function HomePage() {
  return (
    <DashboardLayout crumbs={[{ label: 'Home', href: '/' }]}>
      <div className="position-relative text-center my-6">
        <h1 className="text-white">Welcome to ILA Case!</h1>
        <p className="text-white">Please login to use the dashboard.</p>
      </div>
    </DashboardLayout>
  )
}
