import { motion } from "framer-motion"
import { getUserImage, isUserSignedIn } from "./firebase";
import './App.css';


function App() {
  const userSignedIn = isUserSignedIn();
  const userImage = getUserImage();
  return (
    
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="nav">
        <motion.span class="material-symbols-outlined menu" > menu </motion.span>
        <span className="alignEnd">
        {(userSignedIn) ? (
          <>
            <motion.img src={userImage} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          </>
        ):(<>
          <motion.button style={{background:"#c5d5ea ", border:'none', cursor:'pointer', borderRadius:'27px', height:'30px', width:'90px', margin:'none', fontWeight:'bold'}}>Sign In</motion.button>
        </>)
        }
        </span>

      </div>
      
    </div>
  );
}

export default App;
