import { useState } from "react";
import html2canvas from "html2canvas";
import "../styles/App.scss";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ImageUploader } from "./ImageUploader";
import { Settings, TextAlignment, ImageOutput } from "./ImageOutput";
import { ImageModal } from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Callout from "./Callout";

function App() {
    const [imageText, setImageText] = useState("");
    const [imageObjectUrl, setImageObjectUrl] = useState("");
    const [whisperImageUrl, setWhisperImageUrl] = useState("");
    const [hasUploaded, setHasUploaded] = useState(false);
    const [canDownload, setCanDownload] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [settings, setSettings] = useState<Settings>({
        fontSize: "1",
        font: "Whisper",
        outline: true,
        textColor: "#fafafa",
        outlineColor: "#111",
        textAlignment: TextAlignment.Center,
    });

    const uploadImage = (image: File) => {
        setHasUploaded(true);
        setImageObjectUrl(URL.createObjectURL(image));
        setCanDownload(true);
    };

    const removePartialPixels = () => {
        const imageOutput = document.getElementById("image-output");
        if (imageOutput) {
            const width = imageOutput.getBoundingClientRect().width;
            const height = imageOutput.getBoundingClientRect().height;
            imageOutput.style.width = Math.floor(width) + "px";
            imageOutput.style.height = Math.floor(height) + "px";
        }
    };

    const undoRemovePartialPixels = () => {
        const imageOutput = document.getElementById("image-output");
        if (imageOutput) {
            imageOutput.style.width = "";
            imageOutput.style.height = "";
        }
    };

    const downloadImage = () => {
        removePartialPixels();

        html2canvas(document.getElementById("image-output")!, {
            allowTaint: true,
            useCORS: true,
        }).then(function (canvas) {
            setWhisperImageUrl(canvas.toDataURL("image/png"));
            setImageModalVisible(true);
            undoRemovePartialPixels();
        });
    };

    return (
        <div className="app-wrapper">
            <div className="app">
                <Header />
                <section className="input-section">
                    <div className="text-field-wrapper field-wrapper">
                        <label htmlFor="text-field" className="field-label">
                            Enter text:
                        </label>
                        <textarea
                            id="text-field"
                            className="text-field full-width-box"
                            placeholder="blah blah blah"
                            value={imageText}
                            onChange={(e) => setImageText(e.target.value)}
                        />
                    </div>
                    <div className="image-field-wrapper field-wrapper">
                        <div className="field-label">Select image:</div>
                        {hasUploaded ? (
                            <ImageOutput
                                imageText={imageText}
                                imageObjectUrl={imageObjectUrl}
                                onChangeImage={() => setHasUploaded(false)}
                                settings={settings}
                                setSetting={(setting) =>
                                    setSettings({ ...settings, ...setting })
                                }
                            />
                        ) : (
                            <ImageUploader onUploadImage={uploadImage} />
                        )}
                    </div>
                </section>
                <section className="download-section">
                    <button
                        className="download-image-button"
                        disabled={!canDownload}
                        onClick={() => downloadImage()}
                    >
                        Generate whisper
                    </button>
                </section>
                {imageModalVisible && (
                    <ImageModal
                        imageUrl={whisperImageUrl}
                        onCloseModal={() => setImageModalVisible(false)}
                    />
                )}
                <Callout
                    url="https://newyear.zone/"
                    message="Celebrate the New Year at New Year Zone!"
                />
            </div>
            <Footer />
        </div>
    );
}

export default App;
