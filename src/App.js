import React, { useState, useEffect } from "react";
import axios from "axios";
import Records from "./components/Records";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    const requestOne = axios.get("data/lock_list.json");
    const requestTwo = axios.get("data/other_iot_devices.json");
    const requestThree = axios.get("data/special_integration_lock.json");

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];

          const fullData = [
            ...responseOne.data.locks,
            ...responseTwo.data.results,
            ...responseThree.data.results,
          ];
          setData(fullData);
          setLoading(false);
        })
      )
      .catch((errors) => {
        alert("There was an error while retrieving the data");
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <div className="container mt-5">
      <h2> Assignment </h2>
      <Records data={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
