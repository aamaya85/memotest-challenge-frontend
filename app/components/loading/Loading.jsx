import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ children, visible }) => {
    return (
        <>
        <Backdrop
            sx={{
                color: "#fff",
            }}
            open={visible}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
         {children}
        </>
    );
};

export default Loading;
