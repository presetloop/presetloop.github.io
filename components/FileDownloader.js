import React, { useState } from 'react';
import axios from 'axios';

const FileDownloader = ({ url, fileName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    if (!url || !fileName) {
      console.error('URL or fileName not provided');
      return;
    }

    setShowModal(true);
  };

  const proceedDownload = () => {
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(`Error downloading ${fileName}:`, error);
      });

    setShowModal(false);
  };

  const cancelDownload = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-75 z-50"></div>
          <div className="bg-white rounded p-4 z-50">
            <p className="mb-2">If your browser shows the file extension <span className='font-bold'>.txt</span> change it to <span className='font-bold text-lg'>.wav</span> before you save and download.</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                onClick={proceedDownload}
              >
                Continue
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={cancelDownload}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <img
        onClick={handleDownload}
        className="h-4 w-4 invert"
        src="/download.svg"
        alt="Preset Loop"
      />
    </div>
  );
};

export default FileDownloader;
