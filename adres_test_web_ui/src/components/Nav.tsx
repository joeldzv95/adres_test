import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <nav className="bg-green p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="logo-adres.svg" alt="Logo" className="h-10 w-20 mr-3" />
          <span className="text-white text-2xl font-bold">Gestión de requerimientos de adquisiciones</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white font-bold hover:text-white">
            Inicio
          </Link>
          <Link to="/operation" className="text-white font-bold hover:text-white">
            Creación de adquisiciones
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Nav)
