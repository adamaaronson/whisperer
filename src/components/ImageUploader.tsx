import '../styles/ImageUploader.scss'

interface Props {
    onUploadImage: (e: File) => void
}

export function ImageUploader({ onUploadImage }: Props) {
    return <>
        <label className="image-upload-label" htmlFor="image-upload">
            <div className="image-upload-border">
                click to upload <i className="fa fa-solid fa-upload"></i>
            </div>
        </label>
        <input
            id="image-upload"
            className="image-upload"
            type="file"
            accept="image/*"
            onChange={e => onUploadImage(e.target.files![0])}
        />
    </>
}