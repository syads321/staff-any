import Head from 'next/head'
import React, { FC } from "react";
interface Props {
    // any props that come into the component
}


const DefaultLayout: FC<Props> = ({ children, ...props }) => (
    <div>
        <Head>
            <meta charSet="utf-8" />
        </Head>
        {children}
    </div>
);
export default DefaultLayout