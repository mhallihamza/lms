import React from 'react'
import Sidebar from '../components/Sidebar'
export default function Accueil({socket}) {
  return (
    <div>
    <Sidebar socket = {socket}/>
    </div>
  )
}
