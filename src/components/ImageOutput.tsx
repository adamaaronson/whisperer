import "../styles/ImageOutput.scss";

const TEXT_STROKE_STEPS = 32;

interface Props {
    imageText: string;
    imageObjectUrl: string;
    onChangeImage: () => void;
    settings: Settings;
    setSetting: (setting: Partial<Settings>) => void;
}

export interface Settings {
    fontSize: string;
    font: string;
    outline: boolean;
    textColor: string;
    outlineColor: string;
    textAlignment: TextAlignment;
}

export enum TextAlignment {
    Center = "center",
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
    TopLeft = "topleft",
    TopRight = "topright",
    BottomLeft = "bottomleft",
    BottomRight = "bottomright",
}

export function ImageOutput({
    imageText,
    imageObjectUrl,
    onChangeImage,
    settings,
    setSetting,
}: Props) {
    const getTextShadowCoordinates = (steps: number, strokeWidth: number) => {
        let coordinates = [];

        for (let i = 0; i < steps; i++) {
            let angle = (i * 2 * Math.PI) / steps;
            let cos = Math.round(10000 * Math.cos(angle)) / 10000;
            let sin = Math.round(10000 * Math.sin(angle)) / 10000;
            coordinates.push({
                x: cos * strokeWidth,
                y: sin * strokeWidth,
            });
        }

        return coordinates;
    };

    const getFontSizeStyle = () => {
        return { fontSize: `${settings.fontSize}em` };
    };

    const getTextAlignmentStyle = () => {
        switch (settings.textAlignment) {
            case TextAlignment.Center:
                return {
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center" as const,
                };
            case TextAlignment.Top:
                return {
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlign: "center" as const,
                };
            case TextAlignment.Bottom:
                return {
                    justifyContent: "center",
                    alignItems: "flex-end",
                    textAlign: "center" as const,
                };
            case TextAlignment.Left:
                return {
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "left" as const,
                };
            case TextAlignment.Right:
                return {
                    justifyContent: "flex-end",
                    alignItems: "center",
                    textAlign: "right" as const,
                };
            case TextAlignment.TopLeft:
                return {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left" as const,
                };
            case TextAlignment.TopRight:
                return {
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    textAlign: "right" as const,
                };
            case TextAlignment.BottomLeft:
                return {
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    textAlign: "left" as const,
                };
            case TextAlignment.BottomRight:
                return {
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    textAlign: "right" as const,
                };
        }
    };

    return (
        <div className="image-output-wrapper full-width-box">
            <button className="change-image-button" onClick={onChangeImage}>
                Change image
            </button>
            <div className="image-output" id="image-output">
                <div className="image-text-wrapper">
                    <div
                        className="image-text"
                        style={{
                            color: settings.textColor,
                            fontFamily: settings.font,
                            ...getFontSizeStyle(),
                            ...getTextAlignmentStyle(),
                        }}
                    >
                        {imageText}
                    </div>
                    {settings.outline &&
                        getTextShadowCoordinates(TEXT_STROKE_STEPS, 0.06).map(
                            (coord) => (
                                <div
                                    className="image-text-evil"
                                    key={`${coord.x}, ${coord.y}`}
                                    style={{
                                        left: coord.x + "em",
                                        top: coord.y + "em",
                                        color: settings.outlineColor,
                                        fontFamily: settings.font,
                                        ...getFontSizeStyle(),
                                        ...getTextAlignmentStyle(),
                                    }}
                                >
                                    {imageText}
                                </div>
                            )
                        )}
                </div>
                <div className="image-image">
                    <img
                        id="image-output-image"
                        src={imageObjectUrl}
                        width="100%"
                    />
                </div>
            </div>
            <div className="settings-wrapper">
                <div className="settings-item">
                    <div className="settings-item-name">Font size:</div>
                    <input
                        className="settings-item-input"
                        type="range"
                        min="0.25"
                        max="5"
                        step="0.05"
                        onChange={(e) => {
                            setSetting({ fontSize: e.target.value });
                        }}
                        defaultValue={settings.fontSize}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Align text:</div>
                    <select
                        className="settings-item-input"
                        value={settings.textAlignment}
                        onChange={(e) => {
                            setSetting({
                                textAlignment: e.target.value as TextAlignment,
                            });
                        }}
                    >
                        <option value={TextAlignment.Center}>Center</option>
                        <option value={TextAlignment.Top}>Top</option>
                        <option value={TextAlignment.Bottom}>Bottom</option>
                        <option value={TextAlignment.Left}>Left</option>
                        <option value={TextAlignment.Right}>Right</option>
                        <option value={TextAlignment.TopLeft}>Top left</option>
                        <option value={TextAlignment.TopRight}>
                            Top right
                        </option>
                        <option value={TextAlignment.BottomLeft}>
                            Bottom left
                        </option>
                        <option value={TextAlignment.BottomRight}>
                            Bottom right
                        </option>
                    </select>
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Font:</div>
                    <select
                        className="settings-item-input"
                        value={settings.font}
                        onChange={(e) => {
                            setSetting({ font: e.target.value });
                        }}
                    >
                        <option value="Whisper">Upright (default)</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
                <div className="settings-item">
                    <span className="settings-item-name">Outline:</span>
                    <input
                        className="settings-item-input"
                        type="checkbox"
                        defaultChecked={settings.outline}
                        onClick={() => {
                            setSetting({ outline: !settings.outline });
                        }}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Text color:</div>
                    <input
                        className="settings-item-input"
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => {
                            setSetting({ textColor: e.target.value });
                        }}
                    />
                </div>
                <div className="settings-item">
                    <div className="settings-item-name">Outline color:</div>
                    <input
                        className="settings-item-input"
                        type="color"
                        value={settings.outlineColor}
                        onChange={(e) => {
                            setSetting({ outlineColor: e.target.value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
