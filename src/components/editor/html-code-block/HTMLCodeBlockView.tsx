import React, { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
    props?: any;
    htmlContent?: string;
};

export function HTMLCodeBlockView({ props, htmlContent }: PropsWithChildren<Props>) {
    return (
        <Box
            {...props}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            contentEditable={false}
        />
    );
}
