import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { unselectAllItems } from '@/store/slices/selectedDataSlice';
import ModalMenu from '@/components/redux/ModalMenu';

const mockStore = configureStore([]);
const initialState = {
  selectedData: {
    selectedItems: [],
  },
};
describe('ModalMenu', () => {
  let store: any;
 
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );
    expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
  });

  it('should show the modal when items are selected', () => {
    store = mockStore({
      selectedData: {
        selectedItems: ['item1', 'item2'],
      },
    });

    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );

    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Unselect all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });

  it('should dispatch unselectAllItems action when "Unselect all" button is clicked', () => {
    render(
      <Provider store={store}>
        <ModalMenu />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));
    expect(store.dispatch).toHaveBeenCalledWith(unselectAllItems());
  });
});
