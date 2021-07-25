import React, { useState } from "react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Button, Form, Segment, Label, Loader } from "semantic-ui-react";

const DeployNewElection = () => {
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createElection(name).send({
        from: accounts[0],
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Segment
      padded
      style={{ height: "12vh", backgroundColor: "#333", borderRadius: "0px" }}
    >
      <Form
        style={{ width: "30rem", float: "right" }}
        size="medium"
        onSubmit={onSubmit}
      >
        <Form.Group widths="equal">
          <Label basic color="orange" attached pointing="right">
            Add Constituency
          </Label>
          <Form.Input
            type="text"
            value={name}
            placeholder="Constituency Name"
            onChange={(e) => setname(e.target.value)}
          />
          <Button loading={loading} color="orange">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default DeployNewElection;
