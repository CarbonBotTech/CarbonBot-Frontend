import React, { useState, Fragment, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import config from "../config";
import { 
    Button
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import { DashboardModal } from '@uppy/react'
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css'

const Uploader = ({url,aspectRatio,callback,destination}) => {

    // state
    const [is_opened, setOpen] = useState(false);

    // redux
    const app = useSelector(state => state.app);

    // methods
    const closeUploader = () => {
        setOpen(false);
    }

    const uppy = useMemo(() => {
        return new Uppy({
            restrictions: {
                maxFileSize: 3000000,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/png', 'image/jpeg']
            }
        }).use(Dashboard).use(XHRUpload, { 
            endpoint: `${config.SERVER_URL}/${url}`, 
            formData: true, 
            fieldName: 'file',
            headers: {
                'Authorization': `Bearer ${app.token}`
            }
        }).use(ImageEditor, { 
            target: Dashboard,
            cropperOptions: {
                aspectRatio: aspectRatio,
                viewMode: 1,
                autoCropArea: 1,
                responsive: true
            }
        }).on('complete', result => {
            if(result.successful.length > 0 && result.successful[0].response && result.successful[0].response.body) {
                callback(result.successful[0].response.body);
                return;
            }
        }).on('file-added', (file) =>{
            uppy.setFileMeta(file.id, {
                destination: destination
            });
        }).on('dashboard:modal-closed', () => {
            uppy.reset();
        })
    }, []);

    useEffect(() => {
        return () => uppy.close()
    }, []);

    return (
        <Fragment>
            <Button 
                size="small"
                variant="outlined"
                onClick={() => setOpen(true)}
                style={{backgroundColor:'#fff'}}
                startIcon={<CloudUploadIcon />}
                >
                Upload
            </Button>
            <DashboardModal
                uppy={uppy}
                closeAfterFinish={true}
                closeModalOnClickOutside
                open={is_opened}
                onRequestClose={() =>closeUploader()}
                note="JPEG and PNG only, up to 3MB."
            />
        </Fragment>
        
    )

}

export default Uploader;