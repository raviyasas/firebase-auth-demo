import React from 'react'
import { AddTask } from '../task/AddTask'
import { TaskList } from '../task/TaskList'
import { MenuBar } from './MenuBar'

export const Home = () => {
  return (
    <div>
      <MenuBar/>
      <AddTask />
      <TaskList />
    </div>
  )
}
