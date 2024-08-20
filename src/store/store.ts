import {createStore, Action} from "redux";

interface FormData {
  name: string;
  age: number | string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
  terms: boolean;
  country: string;
  file: FileList | File | string;
}

interface StoreState {
  formData: Partial<FormData>;
}

const initialState: StoreState = {
  formData: {},
};

const SAVE_FORM_DATA = "SAVE_FORM_DATA";

interface SaveFormDataAction extends Action {
  type: typeof SAVE_FORM_DATA;
  payload: Partial<FormData>;
}

export const saveFormData = (data: Partial<FormData>): SaveFormDataAction => ({
  type: SAVE_FORM_DATA,
  payload: data,
});

type FormAction = SaveFormDataAction;

const formReducer = (
  state: StoreState = initialState,
  action: FormAction,
): StoreState => {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(formReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
