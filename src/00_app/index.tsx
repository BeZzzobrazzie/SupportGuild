import { HomePage } from "../01_pages/home-page";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.module.css";

function App() {

  const testTheme = createTheme({
    // defaultRadius: "10px",
    primaryColor: "gray",
  })


  return (
    <MantineProvider theme={testTheme} defaultColorScheme="dark">
      <HomePage />
    </MantineProvider>
  );
}

export default App;
