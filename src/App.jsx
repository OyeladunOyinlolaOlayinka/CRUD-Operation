import React from 'react'
import RecordTable from './components/RecordTable'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <Provider store={store}>
      <Toaster position='top-right' reverseOrder={false} />
      <RecordTable />
    </Provider>
  )
}

export default App
