import "./document.css";
import Title from "../title/title";

function Document() {
    return(
        <div className="document">
            <h2 className="document-title">Document Title</h2>
            <p className="document-content">This is the content of the document.</p>
            <Title />
        </div>
    )
}
export default Document;