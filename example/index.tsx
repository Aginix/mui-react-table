import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExampleDataTable } from "./ExampleDataTable";

const App = () => {
  return (
    <div>
      <ExampleDataTable />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
