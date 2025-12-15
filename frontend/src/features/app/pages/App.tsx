import { useState } from 'react'
import { AccountProvider } from '../../../stores/useAccountContext'
import PizzaCanvas from '../../../pages/PizzaCanvas'
import { useAuth } from '../../../auth/useAuth'
import { AuthProvider } from '../../../auth/AuthProvider';
import LoginPage from '../../auth/pages/LoginPage';

export default function App() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <LoginPage />

  return (
    <>
      <AuthProvider>
        <AccountProvider>
          <PizzaCanvas />
        </AccountProvider>
      </AuthProvider>
    </>
  )
}