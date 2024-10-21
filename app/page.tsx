'use client'
// pages/index.tsx
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
  // State to store the input string from the user
  const [inputString, setInputString] = useState<string>("");

  // State to store the result of the processed data
  const [results, setResults] = useState<number[]>([]);

  // Function to process the input string and calculate results
  const processInputData = (input: string): number[] => {
    // Step 1: Split the input into data and query parts
    const [dataPart, queryPart] = input.split(":");

    // Step 2: Convert both parts into arrays by splitting at commas and trimming whitespace
    const data = dataPart.split(",").map((item) => item.trim());
    const queries = queryPart.split(",").map((item) => item.trim());

    // Step 3: Initialize result array to store counts of each query
    const result: number[] = [];

    // Step 4: Count occurrences of each query in the data array
    queries.forEach((query) => {
      const count = data.filter((item) => item === query).length;
      result.push(count);
    });

    return result;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Step 5: Process the input string and update the results state
    const result = processInputData(inputString);
    setResults(result);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Query Counter</h1>
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

      {/* Step 6: Display the results after processing */}
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results:</h2>
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
  );
};

export default Home;
