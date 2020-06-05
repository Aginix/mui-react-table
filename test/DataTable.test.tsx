import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as DataTable } from '../stories/DataTable.stories';

describe('DataTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
