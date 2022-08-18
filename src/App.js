import React from "react";
import { useSelector } from "react-redux";
import Router from "./shared/router";
import Loading from "./components/Loading";

function App() {
  const isLoading = useSelector((state) => state.post.isLoading);
  return (
    <>
      <Router />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
