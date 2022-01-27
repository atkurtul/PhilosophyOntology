import "./App.css";

import { Box, Button, Container, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { OntoService } from "./OntoService";

function App() {
  const [rule, setRule] = useState("");
  // Create class

  const [queryString, setqueryString] = useState({
    queryString: "SELECT ?x { ?x a owl:ObjectProperty . }",
  });

  const [createClassData, setCreateClassData] = useState({
    superClass: "",
    name: "",
  });
  // Create indiv
  const [createIndivData, setCreateIndivData] = useState({
    class: "",
    name: "",
  });

  function createRule() {
    OntoService.createRuleRequest(rule).then(function (response) {
      console.log(response);
    });
  }

  function createIndividual() {
    OntoService.createIndivRequest(createIndivData).then(function (response) {
      console.log(response);
    });
  }

  function createClass() {
    OntoService.createClassRequest(createClassData).then(function (response) {
      console.log(response);
    });
  }

  useEffect(() => {
    // Do something after sample variable updated
  }, [rule]);

  return (
    <div className="Onto App">
      <header className="App-header">
        <Box>
          <Stack>
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Superclass"
              onChange={(e) => {
                createClassData.superClass = e.target.value;
                setCreateClassData(createClassData);
              }}
            />
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Name"
              onChange={(e) => {
                createClassData.name = e.target.value;
                setCreateClassData(createClassData);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => createClass()}
            >
              Create Class
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                OntoService.getClasses().then((response) =>
                  alert(response.data)
                )
              }
            >
              Show Classes
            </Button>
          </Stack>
          <Stack>
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Class"
              onChange={(e) => {
                createIndivData.class = e.target.value;
                setCreateIndivData(createIndivData);
              }}
            />
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Name"
              onChange={(e) => {
                createIndivData.name = e.target.value;
                setCreateIndivData(createIndivData);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={createIndividual}
            >
              Create Individiual
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                OntoService.getIndivs().then((response) => alert(response.data))
              }
            >
              Show Individiuals
            </Button>
          </Stack>
          <Stack>
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Rule"
              onChange={(e) => {
                setRule(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => createRule()}
            >
              Create Rule
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                OntoService.getRules().then((response) => alert(response.data))
              }
            >
              Show Rules
            </Button>
          </Stack>
          <Stack>
            <TextField
              style={{ margin: 8 }}
              variant="filled"
              label="Query"
              defaultValue = "SELECT ?x { ?x a owl:ObjectProperty . }"
              onChange={(e) => {
                queryString.queryString = e.target.value;
                setqueryString(queryString);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                OntoService.queryDatabase(queryString).then(function (
                  response
                ) {
                  alert(response.data);
                })
              }}
            >
              Query
            </Button>
          </Stack>
        </Box>
      </header>
    </div>
  );
}

export default App;
