import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import RecordModal from "./RecordModal";

import {
  setSearchTerm,
  selectAllRecords,
  selectSearchTerm,
  selectFilteredRecords,
  deleteRecord,
} from "../store/RecordSlice";

const RecordTable = () => {
  const dispatch = useDispatch();

  const records = useSelector(selectFilteredRecords);
  const allRecords = useSelector(selectAllRecords);
  const searchTerm = useSelector(selectSearchTerm);

  const sortedRecords = [...records].sort((a, b) => b.id - a.id);

  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const openCreateModal = () => {
    setCurrentRecord(null);
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };

  const handleDelete = (id) => {
     toast((t)=> (
       <div className="flex flex-col gap-2">
           <span>Are you sure you want to delete {id.name}</span>
           <div className="flex justify-end gap-2">
               <button 
                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                 onClick={()=> 
                 toast.dismiss(t.id)
               }>
                   Cancel
               </button>
               <button 
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  onClick={()=> {
                  dispatch(deleteRecord(id));
                  toast.success("Record deleted successfully");
                  toast.dismiss(t.id)
               }}>
                  Delete
               </button>
      
           </div>
       </div>
     ), {duration: Infinity})
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Employee Management
          </h1>
          <p className="text-gray-600">
            Manage employee records using Redux Toolkit
          </p>
        </div>

        {/* Search & Add */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  dispatch(setSearchTerm(e.target.value))
                }
                placeholder="Search by name, email or position"
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Add New Record
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["ID", "Name", "Email", "Phone", "Position", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y">
                {sortedRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  sortedRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-2 text-sm">{record.id}</td>
                      <td className="px-6 py-2 text-sm">{record.name}</td>
                      <td className="px-6 py-2 text-sm">{record.email}</td>
                      <td className="px-6 py-2 text-sm">{record.phone}</td>
                      <td className="px-6 py-2 text-sm">
                        {record.position}
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(record)}
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                          >
                            <Edit2 size={16} /> Edit
                          </button>

                          <button
                            onClick={() => handleDelete(record.id)}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 text-sm"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */} 
          <div className="bg-gray-50 px-6 py-3 border-t">
            <p className="text-sm text-gray-600">
              Showing {sortedRecords.length} of {allRecords.length} records
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <RecordModal
          closeModal={closeModal} 
          record={currentRecord}
        />
      )}
    </div>
  );
};

export default RecordTable;