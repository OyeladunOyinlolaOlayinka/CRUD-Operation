import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRecord, addRecord } from "../store/RecordSlice";
import toast from "react-hot-toast";

const RecordModal = ({ closeModal, record }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  /* Populate form when editing */
  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name,
        email: record.email,
        phone: record.phone,
        position: record.position,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
      });
    }
  }, [record]);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are required");
      return;
    }

    if (record) {
      dispatch(
        updateRecord({
          id: record.id,
          data: formData,
        })
      );
    } else {
      dispatch(addRecord(formData));
      toast.success("Record added successfully");
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {record ? "Update Record" : "Register New Record"}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {[
            { label: "Name", key: "name", type: "text", placeholder: "Enter full name" },
            { label: "Email", key: "email", type: "email", placeholder: "Enter email address" },
            { label: "Phone", key: "phone", type: "tel", placeholder: "Enter phone number" },
            { label: "Position", key: "position", type: "text", placeholder: "Enter position" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} *
              </label>
              <input
                type={type}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={closeModal}
            className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
          >
            {record ? "Update" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;