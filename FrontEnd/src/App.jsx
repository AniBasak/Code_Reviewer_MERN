import { useState , useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css'
// import { set } from '../../BackEnd/src/app';

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(``);
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}`)

  useEffect(() => {
    prism.highlightAll();
  }, []);

async function reviewCode () {
  console.log("Front End - Reviewing code: ", code);
  setLoading(true);

  const response = await axios.post('http://localhost:3000/ai/get-Review', {code})

  console.log(response.data);
  setReview(response.data);
  setLoading(false);
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
          {/* <div
            onClick={reviewCode} 
            className="review">Review</div> */}
          {/* <button onClick={() => reviewCode()}>Review</button> */}
          <div 
          onClick={reviewCode}
          className="review">
            {loading ? "⏳ Loading review..." : "Review"}
          </div>
        </div>

        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}

function sum(){
  return 1+1;
}

export default App
