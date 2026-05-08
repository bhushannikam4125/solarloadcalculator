import React from 'react'
import { useParams } from 'react-router-dom'

export default function BillDetails() {
  const { billId } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bill Details</h1>
      <p className="mt-2 text-slate-600">Bill ID: {billId}</p>
    </div>
  )
}

