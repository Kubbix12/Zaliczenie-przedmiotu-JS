import './App.css'
import ClassicToggleButton from './components/ClassicToggleButton'
import GoldClicker from './components/GoldClicker'
import ThemeToggleButton from './components/ThemeToggleButton'
import PWAInstallButton from './components/PWAInstallButton'
import { ThemeProvider } from './contexts/ThemeContext'
import HelloFromExpress from './components/HelloFromExpress'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import TaskList from './components/TaskList'

function App() {

  return (
    <>
      <ThemeProvider>
        {/* <PWAInstallButton />
        <ClassicToggleButton />
        <GoldClicker /> */}
        <ThemeToggleButton />
        <ToastContainer />
        {/* <HelloFromExpress /> */}
        <TaskList />
      </ThemeProvider>
      
    </>
  )
}

export default App
