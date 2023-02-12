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
    const [font, setFont] = useState("Whisper")
    const [outline, setOutline] = useState(true)
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
                    color: textColor,
                    fontFamily: font,
                    ...getFontSize()
                }}>
                    {imageText}
                </div>
                { outline && getTextShadowCoordinates(TEXT_STROKE_STEPS, 0.06).map(coord =>
                    <div className="image-text-evil" key={`${coord.x}, ${coord.y}`} style={{
                        left: coord.x + "em",
                        top: coord.y + "em",
                        color: outlineColor,
                        fontFamily: font,
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
                    Font size:
                </div>
                <input
                    className="settings-item-input"
                    type="range"
                    min="0.25"
                    max="5"
                    step="0.05"
                    onChange={(e) => {setFontSize(e.target.value)}}
                    defaultValue={fontSize}
                />
            </div>
            <div className="settings-item">
                <div className="settings-item-name">
                    Font:
                </div>
                <select
                    className="settings-item-input"
                    value={font}
                    onChange={(e) => {setFont(e.target.value)}}
                >
                    <option value="Whisper">Upright (default)</option>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>
            <div className="settings-item">
                <span className="settings-item-name">
                    Outline:
                </span>
                <input
                    className="settings-item-input"
                    type="checkbox"
                    checked={outline}
                    onClick={() => setOutline(!outline)}
                />
            </div>
            <div className="settings-item">
                <div className="settings-item-name">
                    Text color:
                </div>
                <input
                    className="settings-item-input"
                    type="color"
                    value={textColor}
                    onChange={(e) => {setTextColor(e.target.value)}}
                />
            </div>
            <div className="settings-item">
                <div className="settings-item-name">
                    Outline color:
                </div>
                <input
                    className="settings-item-input"
                    type="color"
                    value={outlineColor}
                    onChange={(e) => {setOutlineColor(e.target.value)}}
                />
            </div>
        </div>
    </div>
}