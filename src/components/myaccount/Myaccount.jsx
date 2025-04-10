import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import AuthForm from '../authform/AuthForm'

export default function Myaccount() {
  return (
    <div>
       <Navbar />
       <Topbar />
       <Breadcrumb name="حساب من" />
       <AuthForm />
    </div>
  )
}
