import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Sum from "./Sum";
import Weather from "./Weather";

function Main() {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Stack
      sx={{
        padding: "40px",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs
        disableRipple
        disableFocusRipple
        value={currentTab}
        onChange={(_, newvalue) => setCurrentTab(newvalue)}
        sx={{
          "& .MuiTab-root": {
            fontSize: "16px",
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="SUM" />
        <Tab label="WEATHER" />
      </Tabs>

      <Stack pt={4}>{currentTab === 0 ? <Sum /> : <Weather />}</Stack>
    </Stack>
  );
}

export default Main;
