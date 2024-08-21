import { Link } from 'react-router-dom'

export interface BreadcrumbProps {
  items: { label: string; href: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5 flex-nowrap w-100 overflow-hidden">
        {items.map((item, i) => (
          <li
            className="breadcrumb-item text-sm text-white active flex-shrink-0"
            aria-current={i === items.length - 1 && 'page'}
          >
            <Link
              className={`${i !== items.length - 1 && 'opacity-5'} text-white`}
              to={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
      <h6 className="font-weight-bolder text-white mb-0">
        {items[items.length - 1].label}
      </h6>
    </nav>
  )
}
