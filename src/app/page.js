'use client'
import { auth } from './utils/firebaseConfig';
import LoginPage from './Login/page';
import Dashboard from './admin/Dashboard/page';

export default function HomePage() {
  const user = auth.currentUser;
  return (
    user ? <Dashboard /> : <LoginPage />
  );
}