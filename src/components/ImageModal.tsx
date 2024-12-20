import "../styles/ImageModal.scss";

interface Props {
    imageUrl: string;
    onCloseModal: () => void;
}

export function ImageModal({ imageUrl, onCloseModal }: Props) {
    return (
        <div className="image-modal-wrapper" onClick={onCloseModal}>
            <div
                className="image-modal"
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                    e.stopPropagation()
                }
            >
                <div className="image-modal-header">
                    <div className="image-modal-header-text">
                        <h4 className="image-modal-title">
                            here is your whisper:
                        </h4>
                        <h5 className="image-modal-subtitle">
                            save it, or it'll disappear when you close this
                            window
                        </h5>
                    </div>
                    <button
                        className="image-modal-close-button"
                        onClick={onCloseModal}
                    >
                        ×
                    </button>
                </div>
                <div className="image-modal-output">
                    <img
                        className="image-modal-output-image"
                        src={imageUrl}
                        alt="whisper"
                        crossOrigin="anonymous"
                    />
                </div>
                <div className="image-modal-footer">
                    got feedback? fill out this{" "}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfPumIVFRfFFLpDfTZDMXdArtbP4M6WQDJX1PxO7wQBLAyq0w/viewform">
                        quick survey
                    </a>
                    !
                </div>
            </div>
        </div>
    );
}
