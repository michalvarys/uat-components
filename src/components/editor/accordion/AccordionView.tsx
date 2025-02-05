import React, { PropsWithChildren } from 'react'
import { Accordion, AccordionItem, AccordionButton, Box, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

type Props = {
    title: string,
}
export function AccordionView({ title, children }: PropsWithChildren<Props>) {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {title}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    {children}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}