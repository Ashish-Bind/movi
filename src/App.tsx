import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WatchList from './pages/WatchList'
import Header from './components/Header'
import SingleMovie from './pages/SingleMovie'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
      </Routes>
    </Router>
  )
}

export default App
