import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import withForm from "../withForm";
import './Dropzone.scss';
import classnames from "classnames";
import {save} from "../../../../utils/actionsBuilder";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../../button/Button";

function Dropzone({onChange, onDelete, className, value: files = []}) {

    const actions = {
        uploadFile: (data, callback) => save('admin/documents', "POST", data, callback)
    }

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(acceptedFile => {
            const formData = new FormData();
            formData.append('document[file]', acceptedFile);
            actions.uploadFile(formData, savedFile => onChange(savedFile))
        })

    }, [onChange])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, accept: {
            'image/png': [],
            'image/jpeg': [],
        }
    })

    return (
        <div {...getRootProps()} className={classnames('dropzone', className, {dragging: isDragActive})}>
            <input {...getInputProps()} />
            {files.length < 1 &&
                <div
                    className={classnames("info", {dragging: isDragActive})}>
                    {isDragActive ? "Drop the files here ..." : "Drag 'n' drop some files here, or click to select files"}
                </div>
            }
            {files.map((file) => <div key={file.id} className="image"><Button icon
                                                                              onClick={() => onDelete(file.id)}
                                                                              className="delete"><DeleteIcon/></Button><img
                src={file.url}
                alt={file.name}/>
            </div>)}
        </div>
    )
}

export default withForm(Dropzone);