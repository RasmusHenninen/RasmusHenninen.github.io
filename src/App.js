import Productable from './ProductTable';
import './App.css';
import kahrs from "./kahrs_en.json"
import {
  login, getData
} from "./fetch"
import {
  username, password
} from "./loginInfo"
  useState 
} from "react"

function App() {
  const [data, setData] = useState(kahrs)
  const fetchData = async() => { const token = await login(username, password, true);
  console.log(`Logged in. Token: ${token}`);
  
  const data = await getData(token);
  console.log(JSON.stringify(data));
  setData(data)
  }
  
  return (
    <>
    <button onClick = {fetchData}> fetchData</button>
    <Productable data={data} /> 
    </>
     );
}

export default App;
