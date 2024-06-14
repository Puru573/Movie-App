import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class  extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link to="/" className='movie'>Movies App</Link>
        <Link to="fav" className='favourite'>Favourites</Link>
      </div>
    )
  }
}
