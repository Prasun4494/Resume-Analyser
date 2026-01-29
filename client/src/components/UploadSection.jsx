import React, { useState } from 'react';

const UploadSection = ({ onUpload, isLoading, error }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-10">
            <div
                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out
          ${dragActive ? "border-blue-500 bg-slate-800" : "border-slate-600 bg-slate-900"} 
          ${isLoading ? "opacity-50 pointer-events-none" : "hover:bg-slate-800 hover:border-slate-500"}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept=".pdf"
                />

                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full pt-5 pb-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
                            <p className="text-sm text-slate-400">Analyzing Resume...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-white">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-500">PDF only (MAX. 5MB)</p>
                        </>
                    )}
                </label>
            </div>
            {error && (
                <div className="mt-4 p-4 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default UploadSection;
