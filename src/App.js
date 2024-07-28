import { RecoilRoot } from "recoil";
import MyRoutes from "./MyRoutes";
import GlobalStyles from "./Style/GlobalStyles";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyles />
          <MyRoutes />
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
