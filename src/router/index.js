import AppPage from "../Page/AppPage";
// import RealTime from "../Page/RealTime";
import JSexc from "../Page/JSexc";
import APISuccessRate from "../Page/APISuccessRate";
import PagePfm from "../Page/PagePfm";
import ResourceExc from "../Page/ResourceExc";
import WhiteScreen from "../Page/WhiteScreen";
import PageAccess from "../Page/PageAccess";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppPage />}>
          <Route path="/JSexc" element={<JSexc />}></Route>
          <Route path="/APISuccessRate" element={<APISuccessRate />}></Route>
          <Route path="/PagePfm" element={<PagePfm />}></Route>
          <Route path="/ResourceExc" element={<ResourceExc />}></Route>
          <Route path="/WhiteScreen" element={<WhiteScreen />}></Route>
          <Route path="/PageAccess" element={<PageAccess />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
