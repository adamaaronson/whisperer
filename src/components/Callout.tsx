import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CalloutProps {
    url: string;
    message: string;
}

export default function Callout({ url, message }: CalloutProps) {
    return (
        <div className="callout">
            <a href={url} target="_blank" rel="noopener noreferrer"></a>
            {message} <FontAwesomeIcon icon={faArrowRight} />
        </div>
    );
}
