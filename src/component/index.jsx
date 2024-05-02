import React, { useEffect, useState } from "react";
import "./style.css";

const Index = () => {
  const [loading, setLoading] = useState(false);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const [name, setName] = useState("all");
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(false);

  function handleSearch(name_country) {
    setName("name/" + name_country.target.value);
    setSelected(true);
  }

  function handleBack() {
    setName("all");
    setSelected(false);
  }

  useEffect(() => {
    async function fetchListOfUsers() {
      try {
        setLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/${name}`);
        const data = await response.json();
        console.log(data);
        if (data && data.length) {
          setUsers(data.map((userItem) => userItem));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    fetchListOfUsers();
  }, [name]);

  return (
    <div style={{ marginTop: "50px", height: "200px" }}>
      {loading ? (
        <h1>Loading Data ! Please wait</h1>
      ) : (
        users.map((item, index) => (
          <ul className="list_country" key={index}>
            <div className="up">
              <img
                className="show"
                src={item.flags["png"]}
                alt={item.flags.alt}
              />
            </div>
            <div className="down">
              <li className="show">
                Common: <b> {item.name["common"]}</b>
              </li>
              <li className="show">
                Official: <b>{item.name["official"]}</b>
              </li>
              <li className={selected ? "show" : "hidden"}>
                Capital: <b> {item.capital}</b>
              </li>
              <li className={selected ? "show" : "hidden"}>
                Region: <b>{item.region}</b>
              </li>
            </div>
            <div className="button">
              <button
                className={selected ? "button_show" : "button_hidden"}
                onClick={handleBack}
              >
                Back to Home
              </button>
              <button
                onClick={handleSearch}
                className={selected ? "button_hidden" : "button_show"}
                value={item.name["common"]}
              >
                Information
              </button>
            </div>
          </ul>
        ))
      )}
    </div>
  );
};

export default Index;
