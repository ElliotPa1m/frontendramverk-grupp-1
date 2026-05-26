import { createPortal } from 'react-dom';

export const ConfirmDeletionModal = ({ recipeName, onConfirm, onClose }) => {
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      
      {/* Centered, smaller card for the warning */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all">
        
        {/* Warning Icon (Using a simple emoji, or you can swap for your Icon component!) */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-3xl">⚠️</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Recipe?</h3>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900">"{recipeName}"</span>? This action cannot be undone.
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(); // Trigger the deletion
              onClose();   // Close the modal
            }}
            className="flex-1 py-2 px-4 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );

  return createPortal(modalContent, document.body);
};