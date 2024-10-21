// app/page.tsx
'use client'; // Ensure this component runs in client-side mode
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  // State to store the input string from the user
  const [inputString, setInputString] = useState<string>("");
  
  // State to store the result of the processed data
  const [results, setResults] = useState<number[]>([]);
  
  // Function to process the input string and calculate results
  const processInputData = (input: string): number[] => {
    const [dataPart, queryPart] = input.split(":");
    const data = dataPart.split(",").map((item) => item.trim());
    const queries = queryPart.split(",").map((item) => item.trim());
    const result: number[] = [];

    queries.forEach((query) => {
      const count = data.filter((item) => item === query).length;
      result.push(count);
    });

    return result;
  };

  // Handle form submission for TypeScript section
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission
    const result = processInputData(inputString);
    setResults(result);
  };

  // Function for plain JavaScript processing
  const processAndDisplayResults = () => {
    const inputStringJs = (document.getElementById('jsInputString') as HTMLInputElement).value;
    const result = processInputData(inputStringJs);

    const resultList = document.getElementById('jsResultList') as HTMLUListElement;
    resultList.innerHTML = ''; // Clear any previous results

    result.forEach((count, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = 'Query ' + (index + 1) + ': ' + count;
      listItem.className = 'list-group-item'; // Bootstrap class for styling
      resultList.appendChild(listItem);
    });
  };

  return (
    <div className="row container">
      <div className="col-md-12">
        <h1>Solution of Question #1</h1>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3>Next.js using TypeScript</h3>
          </div>
          <div className="card-body">
            <h4>Query Counter</h4>
            <form onSubmit={handleSubmit}>
              <label htmlFor="inputString">Enter Data and Query String:</label>
              <input
                type="text"
                className="form-control"
                id="inputString"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="e.g. aba, baba, aba, xzxb: aba, xzxb, ab"
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ marginTop: "10px", padding: "10px 20px" }}>
                Process
              </button>
            </form>

            {/* Display the results after processing */}
            {results.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h5>Results:</h5>
                <ul>
                  {results.map((result, index) => (
                    <li key={index}>
                      Query {index + 1}: {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3>Plain JavaScript</h3>
          </div>
          <div className="card-body">
            <h4>Query Counter</h4>
            <label htmlFor="jsInputString">Enter Data and Query String:</label>
            <input
              type="text"
              className="form-control"
              id="jsInputString"
              placeholder="e.g. aba, baba, aba, xzxb: aba, xzxb, ab"
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              required
            />
            <button className="btn btn-primary" style={{ marginTop: "10px", padding: "10px 20px" }} onClick={processAndDisplayResults}>
              Process
            </button>

            {/* Section to display results from plain JavaScript */}
            <div id="jsResultSection" style={{ marginTop: "20px" }}>
              <h5>Results:</h5>
              <ul id="jsResultList" className="list-group">
                {/* Results will be inserted here */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
