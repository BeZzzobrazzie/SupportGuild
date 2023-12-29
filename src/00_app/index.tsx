import { HomePage } from "../01_pages/home-page";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.module.css";
import { TestPage } from "src/01_pages/test-page";
import { useEffect } from "react";
import { ContextMenu, contextMenuModel } from "src/04_entities/context-menu";
import { useStore } from "effector-react";

function App() {

  const testTheme = createTheme({
    // defaultRadius: "10px",
    primaryColor: "gray",
  })

  const CMVisibility = useStore(contextMenuModel.$contextMenuVisibility);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      contextMenuModel.showContextMenu();
    });
    return () => {
      document.removeEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextMenuModel.showContextMenu();
      });
    }
  })

  return (
    <MantineProvider theme={testTheme} defaultColorScheme="dark">
      {CMVisibility && <ContextMenu />}
      {/* <HomePage /> */}
      <TestPage />
    </MantineProvider>
  );
}

export default App;
