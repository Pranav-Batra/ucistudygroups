import NewStudyGroup from "./forms/studyGroup/newStudyGroup";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import GroupDetailView from "./pages/GroupDetail";
function App() 
{
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const fetchUser = async() => {
      try
      {
        const res = await fetch('http://localhost:3000/auth/user', {
          credentials: "include"
        })
        const data = await res.json()
        if (data.loggedIn)
        {
          setUser(data.user)
        }
      }
      catch (err)
      {
        console.error("Error: ", err)
      }
    }
    fetchUser()
  }, [])



  return (
    <div className="App">
      <Router>
        <Navbar user={user}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/studygroups/:id/detail' element={<GroupDetailView />} />
          <Route path='/studygroups/new' element={<NewStudyGroup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
