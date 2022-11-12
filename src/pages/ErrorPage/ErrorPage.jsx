import React from 'react'
import img from '../../assets/16.png'
import './ErrorPage.css'

function ErrorPage() {
  return (
    <div className='error_page'>
      <h2>Looks like you have lost</h2>
        <img src={img} alt="error page"/>
        <a href="/">Take Me Home</a>
    </div>
  )
}

export default ErrorPage