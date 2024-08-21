import { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
}

export default function Card({ title, children }: Props) {
  return (
    <div className="card">
      {title && (
        <div className="card-header pb-0 p-3">
          <div className="d-flex justify-content-between">
            <h6 className="mb-2">{title}</h6>
          </div>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  )
}
