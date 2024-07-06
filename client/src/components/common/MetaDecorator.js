import React from 'react';
import { Helmet } from "react-helmet";

function MetaDecorator({ title = "Default Title", description = "Default Description", src, url }) {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={src} />
            <meta property="og:url" content={url} />
            <meta name='facebook:card' content='summary_large_image' />
            <meta name='instagram:card' content='summary_large_image' />
            <meta name='facebook:image:alt' content={title} />
            <meta name='instagram:image:alt' content={title} />

        </Helmet>
    );
}

export default MetaDecorator;
