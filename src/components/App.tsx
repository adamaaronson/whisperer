import { ChangeEvent, useState } from 'react';
import '../styles/App.scss'

function App() {
    let [imageText, setImageText] = useState('');
    let [image, setImage] = useState<File>();
    let [imageObjectUrl, setImageObjectUrl] = useState('');
    let [hasUploaded, setHasUploaded] = useState(false);
    let [canDownload, setCanDownload] = useState(false);

    const uploadImage = (image: File) => {
        setImage(image);
        setHasUploaded(true);
        setImageObjectUrl(URL.createObjectURL(image))
    }

    return (
        <div className="app">
            <header>
                <h1 className="title">
                    Whisperer
                </h1>
            </header>
            <section className="settings-section">
                <div className="text-field-wrapper">
                    <label htmlFor="text-field" className="text-field-label">
                        Enter text:
                    </label>
                    <textarea
                        id="text-field"
                        className="text-field"
                        placeholder="blah blah blah"
                        value={imageText}
                        onChange={e => setImageText(e.target.value)}
                    />
                </div>
                <div className="image-upload-wrapper">
                    <div className="text-field-label">
                        Select image:
                    </div>
                    { hasUploaded ?
                        <div className="image-canvas-wrapper">
                            <canvas className="image-canvas" />
                            <img src={imageObjectUrl} width="100%" />
                        </div>
                    :
                        <>
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
                                onChange={e => uploadImage(e.target.files![0])}
                            />
                        </>
                    }
                    
                </div>
            </section>
            <section className="output-section">
                <canvas className="image-canvas">

                </canvas>
                <button className="download-image-button" disabled={!canDownload}>
                    Download image
                </button>
            </section>
        </div>
    )
}

export default App
