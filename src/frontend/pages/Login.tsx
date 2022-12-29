import React from 'react'
import { Navigate } from 'react-router-dom'
import authStore from '../stores/authStore'

export default function Login() {
  const s = authStore()

  if (s.loggedIn) return <Navigate to="/" />

  return (
    <div>
      {s.address === '' ? (
        <>
          <button onClick={s.connectWallet}>Connect wallet</button>
        </>
      ) : (
        <>
          <button onClick={s.signin}>Sign in</button>
        </>
      )}
    </div>
  )
}
