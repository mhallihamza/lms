import { useState } from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
        <div className="relative lg:left-24 z-10 w-80 lg:w-96 p-6 bg-white rounded-lg shadow-lg">
          <div className="mb-4 text-lg font-medium text-gray-900">{message}</div>
          <div className="text-sm text-gray-700">
            <p>Warning: This action cannot be undone.</p>
            <p>You will permanently lose some data.</p>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}