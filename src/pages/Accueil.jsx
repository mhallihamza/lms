import React from 'react'
import Sidebar from '../components/Sidebar'
export default function Accueil({Api_url}) {
  return (
    <div>
    <Sidebar Api_url = {Api_url}/>
    </div>
  )
}
