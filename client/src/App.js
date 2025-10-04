import NewStudyGroup from "./forms/studyGroup/newStudyGroup";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import GroupDetailView from "./pages/GroupDetail";
import Profile from "./pages/ProfileDetail";
import ScheduleMeeting from "./forms/ScheduleMeeting";
import UserGroups from "./pages/UserGroups";
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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/schedulemeeting/:id" element={<ScheduleMeeting />} />
          <Route path="/studygroups/usergroups" element={<UserGroups />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
