import React from 'react';
import { Helmet } from "react-helmet";

function MetaDecorator({ title = "Default Title", description = "Default Description", src, url }) {
    return (
        <Helmet>

            <meta property="og:image:secure_url" content={src} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta name='facebook:card' content='summary_large_image' />
            <meta name='instagram:card' content='summary_large_image' />
            <meta name='facebook:image:alt' content={title} />
            <meta name='instagram:image:alt' content={title} />

        </Helmet>
    );
}

export default MetaDecorator;
