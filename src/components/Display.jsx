import React from "react";
import { Box } from "@mui/material";

const Display = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "end",
                p: 2,
                m: 1,
                fontSize: 26
            }}
        >
            <Box>{props.expression}</Box>
            <Box>{props.result}</Box>
        </Box>
    );
};

export default Display;
