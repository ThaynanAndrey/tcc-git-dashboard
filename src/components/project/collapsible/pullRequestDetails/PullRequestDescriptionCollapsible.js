import React from 'react';
import showdown from 'showdown';
import CollapsibleCard from '../../../layout/CollapsibleCard';

const styleCollapsibleHeader = {
    display: "flex",
    justifyContent: "space-between"
};

const styleCollapsibleHeaderText = {
    display: "flex"
};

/**
 * Stateless component with the function of presenting a Collapsible to Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestDescriptionCollapsible = ({ pullRequest }) => {
    
    /**
     * Gets the html desciption from Markdown text.
     */
    const getHtmlMarkdownText = (textMD) => {
        if(textMD && document.getElementById("markdown-description")) {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(textMD);
            document.getElementById("markdown-description").innerHTML = html;
        } else if(document.getElementById("markdown-description")) {
            document.getElementById("markdown-description").innerHTML = "<div>Não há descrição para esse Pull Request!</div>"
        }
    }

    return (
        <CollapsibleCard isActive={false}>
            <div className="collapsible-header" style={styleCollapsibleHeader}>
                <div style={styleCollapsibleHeaderText}>
                    <i className="material-icons">dehaze</i>
                    Descrição
                </div>
            </div>
            <div id="markdown-description"
                    className="collapsible-body body-collapsible-project descriptionPullRequestContent">
                {getHtmlMarkdownText(pullRequest.description)}
            </div>
        </CollapsibleCard>
    );
};

export default PullRequestDescriptionCollapsible;