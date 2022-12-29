import React from 'react'
import { Navigate } from 'react-router-dom'
import authStore from '../stores/authStore'

interface IProps {
  element: React.ReactNode
}

export default function RequireAuth({ element }: IProps) {
  const s = authStore()

  if (!s.loggedIn) return <Navigate to="/login" />

  return <>{element}</>
}
