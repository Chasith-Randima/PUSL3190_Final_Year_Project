// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import YouTube from 'react-youtube';

// const YouTubeCard = ({ video }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <div>
//       <div
//         className="cursor-pointer"
//         onClick={openModal}
//       >
//         <img
//           src={video.snippet.thumbnails.medium.url}
//           alt={video.snippet.title}
//           className="w-full h-auto"
//         />
//         <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
//       </div>

//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
//             <YouTube videoId={video.id.videoId} className="w-full" />
//             <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
//               {video.snippet.title}
//             </Dialog.Title>
//             <p className="mt-2 text-sm text-gray-500">
//               {video.snippet.description}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
//             >
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default YouTubeCard;



// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import YouTube from 'react-youtube';

// const YouTubeCard = ({ video }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   // Options for the YouTube player
//   const opts = {
//     height: '390', // You can set this as per your requirement
//     width: '640',  // You can set this as per your requirement
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div>
//       <div className="cursor-pointer" onClick={openModal}>
//         <img
//           src={video.snippet.thumbnails.medium.url}
//           alt={video.snippet.title}
//           className="w-full h-auto"
//         />
//         <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
//       </div>

//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 overflow-hidden">
//             <div className="aspect-w-16 aspect-h-9"> {/* Maintain aspect ratio */}
//               <YouTube videoId={video.id.videoId} opts={opts} className="w-full h-full" />
//             </div>
//             <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
//               {video.snippet.title}
//             </Dialog.Title>
//             <p className="mt-2 text-sm text-gray-500">
//               {video.snippet.description}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
//             >
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default YouTubeCard;


// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import YouTube from 'react-youtube';

// const YouTubeCard = ({ video }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   // Updated options for the YouTube player for responsiveness
//   const opts = {
//     playerVars: {
//       autoplay: 1, // Auto-play the video on load
//     },
//   };

//   return (
//     <div>
//       <div className="cursor-pointer" onClick={openModal}>
//         <img
//           src={video.snippet.thumbnails.medium.url}
//           alt={video.snippet.title}
//           className="w-full h-auto"
//         />
//         <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
//       </div>

//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto w-full max-w-xl rounded bg-white p-6 overflow-hidden">
//             {/* Responsive iframe container */}
//             <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
//               <YouTube 
//                 videoId={video.id.videoId} 
//                 opts={opts} 
//                 className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" 
//               />
//             </div>
//             <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
//               {video.snippet.title}
//             </Dialog.Title>
//             <p className="mt-2 text-sm text-gray-500">
//               {video.snippet.description}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
//             >
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default YouTubeCard;



// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import YouTube from 'react-youtube';

// const YouTubeCard = ({ video }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   // Options for the YouTube player, mainly for autoplay
//   const opts = {
//     playerVars: {
//       autoplay: 1, // Auto-play the video on load
//     },
//   };

//   return (
//     <div>
//       <div className="cursor-pointer" onClick={openModal}>
//         <img
//           src={video.snippet.thumbnails.medium.url}
//           alt={video.snippet.title}
//           className="w-full h-auto"
//         />
//         <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
//       </div>

//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto w-full max-w-4xl rounded bg-white p-6 overflow-hidden">
//             {/* Responsive iframe container, adjusted for a larger modal */}
//             <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
//               <YouTube 
//                 videoId={video.id.videoId} 
//                 opts={opts} 
//                 className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" 
//               />
//             </div>
//             <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
//               {video.snippet.title}
//             </Dialog.Title>
//             <p className="mt-2 text-sm text-gray-500">
//               {video.snippet.description}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
//             >
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default YouTubeCard;



// import { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import YouTube from 'react-youtube';

// const YouTubeCard = ({ video }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const opts = {
//     playerVars: {
//       autoplay: 1, // Auto-play the video on load
//     },
//   };

//   return (
//     <div>
//       <div className="cursor-pointer" onClick={openModal}>
//         <img
//           src={video.snippet.thumbnails.medium.url}
//           alt={video.snippet.title}
//           className="w-full h-auto"
//         />
//         <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
//       </div>

//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
        
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto w-full max-w-3xl rounded bg-white p-6 overflow-hidden">
//             {/* Responsive iframe container */}
//             <div className="relative" style={{ paddingBottom: "56.25%" }}>
//               <YouTube 
//                 videoId={video.id.videoId} 
//                 opts={opts} 
//                 className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
//               />
//             </div>
//             <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
//               {video.snippet.title}
//             </Dialog.Title>
//             <p className="mt-2 text-sm text-gray-500 overflow-auto" style={{ maxHeight: '6rem' }}>
//               {video.snippet.description}
//             </p>
//             <button
//               onClick={closeModal}
//               className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
//             >
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default YouTubeCard;



import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import YouTube from 'react-youtube';

const YouTubeCard = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Assume a 16:9 aspect ratio for YouTube videos
  const aspectRatioPadding = (9 / 16) * 100;

  return (
    <div>
      <div className="cursor-pointer" onClick={openModal}>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-auto"
        />
        <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="rounded bg-white p-6 overflow-hidden">
            {/* Responsive iframe container */}
            <div className="relative" style={{ paddingBottom: `${aspectRatioPadding}%` }}>
              <YouTube 
                videoId={video.id.videoId} 
                opts={{ playerVars: { autoplay: 1 } }} 
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
              />
            </div>
            <Dialog.Title as="h3" className="text-lg font-semibold mt-4">
              {video.snippet.title}
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-500">
              {video.snippet.description}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default YouTubeCard;
