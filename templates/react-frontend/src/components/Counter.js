import React, { useState, useEffect } from 'react'
import "../App.css"
import {ticker, contractAddress, connex, Contract} from '../config/connex'

export const Counter = () => {
  const [count, setCount] = useState()
  useEffect(() => {
    getCount()
  })

  async function getCount() {
    await ticker.next()
    const res = await Contract.count()
    setCount(Number(res.data))
    getCount()
  }
  
  return (
    <div className='counter'>
          <p id='count'>{count}</p>
    </div>
  )
}
