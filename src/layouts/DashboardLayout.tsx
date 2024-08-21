import { BreadcrumbProps } from '../components/Breadcrumb'
import Navbar from '../components/Navbar'

interface Props {
  children: React.ReactNode
  crumbs?: BreadcrumbProps['items']
}

export default function DashboardLayout({ children, crumbs }: Props) {
  return (
    <>
      <header>
        <div className="min-height-300 bg-primary position-absolute w-100" />
        <Navbar crumbs={crumbs} />
      </header>
      <main className="container main-content pb-6">{children}</main>
    </>
  )
}
