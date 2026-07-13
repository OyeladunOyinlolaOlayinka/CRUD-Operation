import { createSlice } from "@reduxjs/toolkit";

/* ----------------------------------
   Demo Records
---------------------------------- */
const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    position: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "538-456-7493",
    position: "Designer",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "323-094-6492",
    position: "Manager",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    phone: "093-7832-9845",
    position: "Product Manager",
  },
];

/* ----------------------------------
   Helpers
---------------------------------- */
const loadRecordsFromStorage = () => {
  try {
    const saved = localStorage.getItem("employeeRecords");
    return saved ? JSON.parse(saved) : demoRecords;
  } catch (error) {
    console.error("Error loading records:", error);
    return demoRecords;
  }
};

const calculateNextId = (records = []) => {
  if (records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id)) + 1;
};

/* ----------------------------------
   Initial State
---------------------------------- */
const initialItems = loadRecordsFromStorage();

const initialState = {
  items: initialItems,
  searchTerm: "",
  nextId: calculateNextId(initialItems),
};

/* ----------------------------------
   Slice
---------------------------------- */
const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecord(state, action) {
      const newRecord = {
        id: state.nextId,
        ...action.payload,
      };

      state.items.push(newRecord);
      state.nextId += 1;

      localStorage.setItem(
        "employeeRecords",
        JSON.stringify(state.items)
      );
    },

    updateRecord(state, action) {
      const { id, data } = action.payload;
      const record = state.items.find((r) => r.id === id);

      if (record) {
        Object.assign(record, data);
        localStorage.setItem(
          "employeeRecords",
          JSON.stringify(state.items)
        );
      }
    },

    deleteRecord(state, action) {
      state.items = state.items.filter(
        (r) => r.id !== action.payload
      );

      state.nextId = calculateNextId(state.items);

      localStorage.setItem(
        "employeeRecords",
        JSON.stringify(state.items)
      );
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    resetAllRecords(state) {
      state.items = [...demoRecords];
      state.nextId = calculateNextId(demoRecords);

      localStorage.setItem(
        "employeeRecords",
        JSON.stringify(demoRecords)
      );
    },
  },
});

/* ----------------------------------
   Actions
---------------------------------- */
export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSearchTerm,
  resetAllRecords,
} = recordSlice.actions;

/* ----------------------------------
   Selectors
---------------------------------- */
export const selectAllRecords = (state) =>
  state.records.items;

export const selectSearchTerm = (state) =>
  state.records.searchTerm;

export const selectFilteredRecords = (state) => {
  const term = state.records.searchTerm.toLowerCase();

  return state.records.items.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term)
  );
};

/* ----------------------------------
   Reducer
---------------------------------- */
export default recordSlice.reducer;