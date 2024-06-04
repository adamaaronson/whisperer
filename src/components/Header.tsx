import "../styles/Header.scss";

export function Header() {
    return (
        <header className="app-header">
            <div>
                <h1 className="title">Whisperer</h1>
            </div>
            <div>
                <h2 className="subtitle">
                    create your own
                    <br />
                    <a
                        href="https://knowyourmeme.com/memes/sites/whisper"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        whisper
                    </a>{" "}
                    images
                </h2>
            </div>
        </header>
    );
}
