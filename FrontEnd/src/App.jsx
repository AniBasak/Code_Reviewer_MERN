import { useState , useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { doSignOut } from './firebase/auth';
import { useNavigate } from 'react-router-dom';

// import { set } from '../../BackEnd/src/app';

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [loadingR, setLoadingR] = useState(false);
  const [loadingS, setLoadingS] = useState(false);
  const [review, setReview] = useState(``);
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}`)

  useEffect(() => {
    prism.highlightAll();
  }, []);

async function reviewCode () {
  console.log("Front End - Reviewing code: ", code);
  setLoadingR(true);

  const response = await axios.post('http://localhost:3000/ai/review', {code})

  console.log(response.data);
  setReview(response.data);
  setLoadingR(false);
}

async function saveReview () {
  console.log("Front End - Saving review: ");
  setLoadingS(true);
  const userId = localStorage.getItem('userId');
  console.log("App.jsx saveReview() User ID from localStorage:", userId);
  try {
    const response = await axios.post('http://localhost:3000/ai/review/save', {
      userId, // Include userId in the request body
      code, 
      review
    });
    console.log(response.data);
    toast.success("Review saved successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to save review");
  }
  setLoadingS(false);
}

async function handleSignOut() {
  try {
    await doSignOut();
    localStorage.removeItem('userId');
    toast.success('Signed out successfully!');
    navigate('/'); // Redirect to login page
  } catch (error) {
    console.error('Sign out failed:', error);
    toast.error('Failed to sign out');
  }
}

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                color: "#f8f8f2",
                minHeight: "100%",
              }} 
            />
          </div>


              <div 
              onClick={reviewCode}
              className="review">
                {loadingR ? "⏳ Reviewing..." : "Review"}
              </div>
              <div 
              onClick={saveReview}
              className="save">
                {loadingS ? "⏳ Saving..." : "Save"}
              </div>
            
        </div>

        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
      <div 
        onClick={handleSignOut} 
        className="signout"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: '#fff',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        Sign Out
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

function sum(){
  return 1+1;
}

export default App
