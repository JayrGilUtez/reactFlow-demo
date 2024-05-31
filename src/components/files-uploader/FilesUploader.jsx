import React, { useState, useEffect } from 'react';
import '../files-uploader/files-uploader-styles.css'
import { openDB } from 'idb';

export default function FilesUploader() {
    const [files, setFiles] = useState([]);

    // Load files from IndexedDB when component mounts
    useEffect(() => {
        const loadFiles = async () => {
            const db = await openDB('myDb', 1, {
                upgrade(db) {
                    db.createObjectStore('files');
                },
            });
            const savedFiles = await db.getAll('files') || [];
            setFiles(savedFiles);
        };

        loadFiles();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const newFile = { name: file.name, dataUrl: reader.result };
            const updatedFiles = [...files, newFile];

            setFiles(updatedFiles);

            const db = await openDB('myDb', 1);
            await db.put('files', newFile, newFile.name);
        };

        reader.readAsDataURL(file);
    };
    return (
        <div className="files-uploader-container">
            <label htmlFor="file-upload" className="files-uploader-button">
                Subir
            </label>
            <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {files.map((file, index) => (
                    <div key={index} className="file">
                        {file.name.endsWith('.mp4') ? (
                            <video src={file.dataUrl} style={{ width: '40px', height: '40px', borderRadius: 5, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }} />
                        ) : (
                            <img src={file.dataUrl} alt={file.name} style={{ width: '40px', height: '40px', borderRadius: 5, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
