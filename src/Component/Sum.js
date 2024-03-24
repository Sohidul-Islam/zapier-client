import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

function Sum() {
  const [sum, setSum] = useState({ num1: "", num2: "", dataType: "object" });
  const [result, setResult] = useState({});
  const onChangeHandler = (e) => {
    setResult({});
    setSum((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const api = "http://test-express-server-ten.vercel.app/sum";

  const sumMutation = useMutation(
    (data) => {
      return axios.get(api, {
        params: data,
      });
    },
    {
      onSuccess: (data) => {
        console.log(data?.data);

        if (data?.data?.status) setResult(data?.data);
      },
    }
  );

  const onSubmitHandler = () => {
    if (!sum?.num1) {
      window.alert("Enter number 1");
      return;
    }
    if (!sum?.num2) {
      window.alert("Enter number 2");
      return;
    }

    sumMutation.mutate(sum);
  };

  return (
    <Box>
      <Stack gap={4} sx={{ width: "60vw" }}>
        <Stack gap={1} alignItems={"flex-start"}>
          <Typography>Number 1</Typography>
          <TextField
            fullWidth
            type="number"
            value={sum?.num1}
            name="num1"
            onChange={onChangeHandler}
            placeholder="enter number 1"
          />
        </Stack>
        <Stack gap={1} alignItems={"flex-start"}>
          <Typography>Number 2</Typography>
          <TextField
            fullWidth
            type="number"
            value={sum?.num2}
            name="num2"
            onChange={onChangeHandler}
            placeholder="enter number 2"
          />
        </Stack>
        <Button
          variant="contained"
          onClick={onSubmitHandler}
          disabled={sumMutation?.isLoading}
        >
          Result
        </Button>
      </Stack>

      {result?.output && (
        <Box pt={4}>
          <Stack>
            <Typography>Result: {result?.output}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Sum;
