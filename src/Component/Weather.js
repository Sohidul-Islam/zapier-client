import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

function Weather() {
  const [weather, setWeather] = useState({ city: "" });
  const [result, setResult] = useState({});
  const onChangeHandler = (e) => {
    setResult({});
    setWeather((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const api = "http://test-express-server-ten.vercel.app/weather";

  const weatherMutation = useMutation(
    (data) => {
      return axios.get(api, {
        params: data,
      });
    },
    {
      onSuccess: (data) => {
        console.log(data?.data);

        setResult(data?.data);
      },
    }
  );

  const onSubmitHandler = () => {
    if (!weather?.city) {
      window.alert("Enter city name");
      return;
    }

    weatherMutation.mutate(weather);
  };

  return (
    <Stack gap={4} sx={{ width: "60vw" }}>
      <Stack gap={1} alignItems={"flex-start"}>
        <Typography>City</Typography>
        <TextField
          type="text"
          fullWidth
          value={weather?.city}
          name="city"
          placeholder="enter city name or lat,lon"
          onChange={onChangeHandler}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={onSubmitHandler}
        disabled={weatherMutation?.isLoading}
      >
        Submit
      </Button>

      {result?.location && (
        <Box pt={4}>
          <Stack>
            <Typography>Location: {result?.location?.name}</Typography>
            <Typography>
              Time: {new Date(result?.location?.localtime)?.toLocaleString()}
            </Typography>
            <Typography>Temperature: {result?.current?.temp_c} °C</Typography>
            <Typography>Temperature: {result?.current?.temp_f} °F</Typography>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

export default Weather;
