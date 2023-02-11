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

    return (
        <div className="app-wrapper">
            <div className="app">
                <Header/>
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
                    <div className="image-field-wrapper">
                        <div className="text-field-label">
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
                        Generate image
                    </button>
                </section>
                { imageModalVisible &&
                    <ImageModal />
                }
            </div>
            <Footer/>
        </div>
    )
}

export default App
