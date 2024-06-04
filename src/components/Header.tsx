import "../styles/Header.scss";

export function Header() {
    return (
        <header className="app-header">
            <h1 className="title">Whisperer</h1>
            <h2 className="subtitle">
                create&nbsp;your&nbsp;own
                <br />
                <a
                    href="https://knowyourmeme.com/memes/sites/whisper"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    whisper
                </a>
                &nbsp;images
            </h2>
        </header>
    );
}
