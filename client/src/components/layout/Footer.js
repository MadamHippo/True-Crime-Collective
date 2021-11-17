import React from 'react'
//installed React / Redux to build RFC components, easy to type shorthands 

export default function Footer() {
  return (
  <footer className="bg-dark text-white mt-5 p-4 text-center">
    Copyright &copy; {new Date().getFullYear()} True Crime Collective. All rights reserved.
  </footer>
    // Change class to className=
  )
}
// RFC component ... simple function based component, one function and it returns html, easy.