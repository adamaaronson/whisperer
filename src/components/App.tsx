import { useState } from 'react';
import html2canvas from 'html2canvas';
import '../styles/App.scss'

const TEXT_STROKE_STEPS = 32;
const APP_TITLE = "Whisperer"

function App() {
    let [imageText, setImageText] = useState('');
    let [imageObjectUrl, setImageObjectUrl] = useState('');
    let [hasUploaded, setHasUploaded] = useState(false);
    let [canDownload, setCanDownload] = useState(false);

    const uploadImage = (image: File) => {
        setHasUploaded(true);
        setImageObjectUrl(URL.createObjectURL(image))
        setCanDownload(true);
    }

    const downloadImage = () => {
        html2canvas(document.getElementById('image-output')!,{
            allowTaint: true,
            useCORS: true,
        }).then(function(canvas) {
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.download = 'whisperer-image';
            link.href = dataUrl;

            canvas.toBlob((blob) => {
                if (blob) {
                    const shareData = {
                        files: [
                            new File([blob], 'file.png', {
                                type: blob.type,
                            }),
                        ]
                    };
                    if ("share" in navigator && navigator.canShare(shareData)) {
                        // can use Web Share API
                        navigator.share(shareData);
                    } else {
                        link.click();
                    }
                } else {
                    link.click();
                }
            });
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
        <div className="app-wrapper">
            <div className="app">
                <header className="app-header">
                    <div className="title-wrapper">
                        <h1 className="title">
                            {APP_TITLE}
                        </h1>
                    </div>
                    <h2 className="subtitle">
                        create your own<br/>
                        <a href="https://knowyourmeme.com/memes/sites/whisper" target="_blank" rel="noopener noreferrer">whisper</a> images
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
                                <button className="change-image-button" onClick={() => setHasUploaded(false)}>
                                    Change image
                                </button>
                                <div className="image-output" id="image-output">
                                    <div className="image-text-wrapper">
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
                                    </div>
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
            <footer>
                made by <a href="https://twitter.com/aaaronson" target="_blank" rel="noopener noreferrer">Adam Aaronson</a><br/>
                thanks to <a href="https://twitter.com/anniierau" target="_blank" rel="noopener noreferrer">Annie Rauwerda</a>'s idea<br/>
                not affiliated with <a href="https://whisper.sh" target="_blank" rel="noopener noreferrer">whisper</a>
            </footer>
        </div>
    )
}

export default App
