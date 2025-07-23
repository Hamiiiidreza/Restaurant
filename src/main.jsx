import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { ToastProvider } from './components/ui/toast.jsx'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider>
              <App />
              <Toaster />
            </ToastProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  </CookiesProvider>
);
