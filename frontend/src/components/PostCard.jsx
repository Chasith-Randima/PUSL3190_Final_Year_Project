import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const PostCard = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={post.data.thumbnail}
        alt={post.data.title}
        className="w-full h-auto mb-2"
        onClick={openModal}
      />
      <h5 className="text-lg font-bold mb-2" onClick={openModal}>{post.data.title}</h5>
      
      {/* Modal for showing the post content */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
              <Dialog.Title className="text-lg font-bold">{post.data.title}</Dialog.Title>
              <p className="mt-2">{post.data.selftext || 'No additional text.'}</p>
              <a href={post.data.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
                Read more
              </a>
              <button
                type="button"
                className="mt-4 bg-gray-200 rounded px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                onClick={closeModal}
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PostCard;
