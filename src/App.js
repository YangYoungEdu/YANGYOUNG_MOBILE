import MyRoutes from "./MyRoutes";
import GlobalStyles from "./Style/GlobalStyles";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <MyRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
