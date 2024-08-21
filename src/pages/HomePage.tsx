import DashboardLayout from '../layouts/DashboardLayout'

export default function HomePage() {
  return (
    <DashboardLayout crumbs={[{ label: 'Home', href: '/' }]}>
      Home Page
    </DashboardLayout>
  )
}
