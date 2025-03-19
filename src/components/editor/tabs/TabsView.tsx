import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import { renderJSON } from "../renderJson";

export type TabType = {
    title: string
    content: string
    json: any
}

export type TapsViewProps = {
    tabs: TabType[]
}

export function TabsView({ tabs }: TapsViewProps) {
    return (<Tabs
        variant="solid-rounded"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="md"
        py={4}
        mt={4}
    >
        <TabList>
            {tabs.map(({ title }, index) => (
                <Tab
                    _active={{ color: 'white', bgColor: 'brand.500' }}
                    key={index}
                >
                    {title}
                </Tab>
            ))}
        </TabList>

        <TabPanels>
            {tabs.map(({ title, content, json }, index) => (
                <TabPanel key={index}>
                    <Box
                        key={title}
                        mb={6}
                        sx={{
                            'a:hover': {
                                color: 'uat_orange',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {renderJSON(json.content)}
                    </Box>
                </TabPanel>
            ))}
        </TabPanels>
    </Tabs>)
}