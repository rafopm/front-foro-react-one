import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';
import { Inter } from 'next/font/google'




export default function Home() {

  return (
    <Layout title="Bienvenido">
      <LoginForm />
    </Layout>
  );
}
