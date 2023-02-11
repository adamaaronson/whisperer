import '../styles/ImageOutput.scss';

const TEXT_STROKE_STEPS = 32;

interface Props {
    imageText: string
    imageObjectUrl: string
    onChangeImage: () => void
}

export function ImageOutput({ imageText, imageObjectUrl, onChangeImage }: Props) {
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

    return <div className="image-output-wrapper">
        <button className="change-image-button" onClick={onChangeImage}>
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
}