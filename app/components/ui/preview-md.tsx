import React from 'react';

interface PreviewComponentProps {
    markdown: any;
}

const PreviewComponent: React.FC<PreviewComponentProps> = ({ markdown }) => {
    return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
};

export default PreviewComponent;
