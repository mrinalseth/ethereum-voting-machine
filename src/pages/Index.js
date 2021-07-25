import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

import ElectionList from "../components/ElectionList";
import DeployNewElection from "../components/DeployNewElection";

const Index = () => {
  const [elections, setElections] = useState([]);
  const ec = '0x25c6df2ECB245f1ae5F37DBCf5df788ec2e9DA3E'
  const [currAccount, setCurrAccount] = useState("");
  useEffect(() => {
    async function fetchData() {
      setCurrAccount(await web3.eth.getAccounts());
      setElections(await factory.methods.getDeployedElection().call());
    }
    fetchData();
  }, []);

  const renderElection = () => {
    const items = elections.map((address) => {
      return (
        <ElectionList
          style={{display:'flex',flexWrap: 'wrap'}}
          address={address}
          ec={ec}
        />
      );
    });
    return items;
  };

  return (
    <div>
      {currAccount[0] === ec ? <DeployNewElection /> : null}
      <div
        style={{
          maxWidth: "900px",
          display: "flex",
          justifyContent: "space-around",
          margin: "50px auto",
        }}
      >
        {renderElection()}
      </div>
    </div>
  );
};

export default Index;
