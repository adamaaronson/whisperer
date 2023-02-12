import { useState } from 'react';
import html2canvas from 'html2canvas';
import '../styles/App.scss'
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageUploader } from './ImageUploader';
import { ImageOutput } from './ImageOutput';
import { ImageModal } from './ImageModal';

function App() {
    let [imageText, setImageText] = useState('');
    let [imageObjectUrl, setImageObjectUrl] = useState('');
    let [whisperImageUrl, setWhisperImageUrl] = useState('');
    let [hasUploaded, setHasUploaded] = useState(false);
    let [canDownload, setCanDownload] = useState(false);
    let [imageModalVisible, setImageModalVisible] = useState(false);

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
            canvas.toBlob((blob) => {
                if (blob) {
                    setWhisperImageUrl(URL.createObjectURL(blob))
                    setImageModalVisible(true);
                }
            }, 'image/png')
        });
    }

    return (
        <div className="app-wrapper">
            <div className="app">
                <Header/>
                <section className="settings-section">
                    <div className="text-field-wrapper field-wrapper">
                        <label htmlFor="text-field" className="field-label">
                            Enter text:
                        </label>
                        <textarea
                            id="text-field"
                            className="text-field full-width-box"
                            placeholder="blah blah blah"
                            value={imageText}
                            onChange={e => setImageText(e.target.value)}
                        />
                    </div>
                    <div className="image-field-wrapper field-wrapper">
                        <div className="field-label">
                            Select image:
                        </div>
                        { hasUploaded ?
                            <ImageOutput 
                                imageText={imageText}
                                imageObjectUrl={imageObjectUrl}
                                onChangeImage={() => setHasUploaded(false)}
                            />
                        :
                            <ImageUploader onUploadImage={uploadImage} />
                        }
                    </div>
                </section>
                <section className="download-section">
                    <button className="download-image-button" disabled={!canDownload} onClick={() => downloadImage()}>
                        Generate whisper
                    </button>
                </section>
                { imageModalVisible &&
                    <ImageModal 
                        imageUrl={whisperImageUrl}
                        onCloseModal={() => setImageModalVisible(false)}
                    />
                }
            </div>
            <Footer/>
        </div>
    )
}

export default App
