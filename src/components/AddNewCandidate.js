import React, { useState } from "react";
import Election from "../ethereum/election";
import web3 from "../ethereum/web3";
import { Button, Form, Segment, Loader } from "semantic-ui-react";
import {Redirect} from 'react-router-dom'

const AddNewCandidate = ({ address }) => {
  const [name, setName] = useState("");
  const [partyName, setpartyName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const election = Election(address);
      const accounts = await web3.eth.getAccounts();
      await election.methods.contestElection(name, partyName, bio).send({
        from: accounts[0],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <Segment padded style={{ maxWidth: "800px", margin: "3rem auto" }}>
      <Form onSubmit={onSubmit}>
        <Form.Field style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "1rem" }}>Nominee Name</label>
          <Form.Input
            label=""
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "1rem" }}>Party Name</label>
          <Form.Input
            type="text"
            placeholder="Party Name"
            value={partyName}
            onChange={(e) => setpartyName(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "1rem" }}>Description</label>
          <Form.Input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Field>
        <Button basic color="orange">
          {loading ? (
            <Loader inline active size="tiny" style={{ marginRight: "5px" }} />
          ) : null}
          Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default AddNewCandidate;
