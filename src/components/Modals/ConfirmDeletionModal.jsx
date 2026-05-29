import { createPortal } from 'react-dom';

export const ConfirmDeletionModal = ({ recipeName, onConfirm, onClose }) => {
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      
      {/* Centered card using your global theme variables */}
      <div className="bg-card-bg rounded-xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all border border-pop/20">
        
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-red-200">
          <span className="text-red-500 text-3xl">⚠️</span>
        </div>
        
        {/* Themed Header */}
        <h3 className="barlow-condensed-regular text-3xl text-text mb-2">Delete Recipe?</h3>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-pop">"{recipeName}"</span>? This action cannot be undone.
        </p>
        
        {/* Action Buttons styled to match your global form buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="barlow-condensed-regular flex-1 py-3 px-4 rounded-lg bg-card-pop text-pop border border-pop/20 text-xl tracking-wide uppercase shadow-sm hover:brightness-95 active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(); // Trigger the deletion
              onClose();   // Close the modal
            }}
            className="barlow-condensed-regular flex-1 py-3 px-4 rounded-lg bg-red-600 text-white text-xl tracking-wide uppercase shadow-sm hover:bg-red-700 active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );

  return createPortal(modalContent, document.body);
};