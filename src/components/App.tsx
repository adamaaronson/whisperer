import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import '../styles/App.scss'

const TEXT_STROKE_STEPS = 32;
const APP_TITLE = "Whisperer"

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
        setCanDownload(true);
    }

    const downloadImage = () => {
        htmlToImage.toCanvas(document.getElementById('image-output')!)
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = 'whisperer-image';
            link.href = dataUrl.toDataURL();
            link.click();
        });
    }

    const getTextShadowCoordinates = (steps: number, strokeWidth: number) => {
        let coordinates = []
        
        for (let i = 0; i < steps; i++) {
            let angle = (i * 2 * Math.PI) / steps;
            let cos = Math.round(10000 * Math.cos(angle)) / 10000;
            let sin = Math.round(10000 * Math.sin(angle)) / 10000;
            coordinates.push({
                "x": cos * strokeWidth,
                "y": sin * strokeWidth
            })
        }

        return coordinates;
    }

    return (
        <div className="app">
            <header>
                <div className="title-wrapper">
                    <h1 className="title">
                        {APP_TITLE}
                    </h1>
                </div>
                <h2 className="subtitle">
                    create <a href="https://knowyourmeme.com/memes/sites/whisper" target="_blank" rel="noopener noreferrer">whisper</a><br/>
                    images online
                </h2>
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
                        <div className="image-output-wrapper">
                            <div className="image-output" id="image-output">
                                <div className="image-text">
                                    {imageText}
                                </div>
                                { getTextShadowCoordinates(TEXT_STROKE_STEPS, 0.06).map(coord =>
                                    <div className="image-text-evil" style={{
                                        "left": coord.x + "em",
                                        "top": coord.y + "em"
                                    }}>
                                        {imageText}
                                    </div>
                                ) }
                                <div className="image-image">
                                    <img src={imageObjectUrl} width="100%" />
                                </div>
                            </div>
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
            <section className="download-section">
                <button className="download-image-button" disabled={!canDownload} onClick={() => downloadImage()}>
                    Download image
                </button>
            </section>
        </div>
    )
}

export default App
