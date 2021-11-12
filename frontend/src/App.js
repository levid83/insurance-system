import ErrorBoundary from "./components/ErrorBoundary";

import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box } from "@mui/material";
import ContractContainer from "./components/ContractContainer";

function App() {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ p: 2 }}>
          <ErrorBoundary>
            <ContractContainer />
          </ErrorBoundary>
        </Box>
      </Container>
    </>
  );
}

export default App;
