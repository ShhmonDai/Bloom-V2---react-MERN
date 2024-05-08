import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Goals() {

  const { currentUser } = useSelector((state) => state.user);

  const [userGoals, setUserGoals] = useState([]);



  return (
    <div>
      Goals here
    </div>
  )
}
