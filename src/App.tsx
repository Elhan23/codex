import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ItemsTable from "./components/ItemsTable";

const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <ItemsTable />
      </Provider>
    </div>
  );
};

export default App;
