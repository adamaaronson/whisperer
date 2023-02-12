import { useState } from 'react';
import '../styles/ImageOutput.scss';

const TEXT_STROKE_STEPS = 32;

interface Props {
    imageText: string
    imageObjectUrl: string
    onChangeImage: () => void
}

export function ImageOutput({ imageText, imageObjectUrl, onChangeImage }: Props) {
    const [fontSize, setFontSize] = useState("1")
    const [textColor, setTextColor] = useState("#fafafa")
    const [outlineColor, setOutlineColor] = useState("#111")

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

    const getFontSize = () => {
        return {fontSize: `${fontSize}em`}
    }

    return <div className="image-output-wrapper full-width-box">
        <button className="change-image-button" onClick={onChangeImage}>
            Change image
        </button>
        <div className="image-output" id="image-output">
            <div className="image-text-wrapper">
                <div className="image-text" style={{
                    "color": textColor,
                    ...getFontSize()
                }}>
                    {imageText}
                </div>
                { getTextShadowCoordinates(TEXT_STROKE_STEPS, 0.06).map(coord =>
                    <div className="image-text-evil" key={`${coord.x}, ${coord.y}`} style={{
                        "left": coord.x + "em",
                        "top": coord.y + "em",
                        "color": outlineColor,
                        ...getFontSize()
                    }}>
                        {imageText}
                    </div>
                ) }
            </div>
            <div className="image-image">
                <img src={imageObjectUrl} width="100%" />
            </div>
        </div>
        <div className="settings-wrapper">
            <div className="settings-item">
                <div className="settings-item-name">
                    Font size
                </div>
                <input
                    className="font-size-slider"
                    type="range"
                    min="0.25"
                    max="3"
                    step="0.05"
                    onChange={(e) => {setFontSize(e.target.value)}}
                    defaultValue={fontSize}
                />
            </div>
            <div className="settings-item">
                <div className="settings-item-name">
                    Text color
                </div>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {setTextColor(e.target.value)}}
                />
            </div>
            <div className="settings-item">
                <div className="settings-item-name">
                    Outline color
                </div>
                <input
                    type="color"
                    value={outlineColor}
                    onChange={(e) => {setOutlineColor(e.target.value)}}
                />
            </div>
        </div>
    </div>
}