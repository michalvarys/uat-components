import { Heading, ListItem, OrderedList, Table, Td, Tr, UnorderedList, Image } from "@chakra-ui/react"
import { GalleryView } from "./gallery"
import { HTMLCodeBlockView } from "./html-code-block"
import { AccordionView } from "./accordion"

export function renderJSON(content: any[]) {
    console.log({ content })
    return content?.map?.((item) => {
        const { attrs, content, type, text } = item
        try {
            switch (type) {
                case 'gallery':
                    return <GalleryView attrs={attrs} />
                case 'chakraImage':
                    // eslint-disable-next-line jsx-a11y/alt-text
                    return <Image {...attrs} />
                case 'text':
                    return text

                case 'paragraph':
                    return renderJSON(content)

                case 'htmlCodeBlock':
                    return <HTMLCodeBlockView {...attrs} props={{ mt: 8 }} />

                case 'heading': {
                    const { level, ...props } = attrs as {
                        level: 1 | 2 | 3 | 4
                        textAlign: 'left' | 'right' | 'center'
                    }

                    return (
                        <Heading {...props} as={`h${level}`}>
                            {renderJSON(content)}
                        </Heading>
                    )
                }
                case 'accordion':
                    return <AccordionView {...attrs}>{renderJSON(content)}</AccordionView>

                case 'orderedList':
                    return <OrderedList>{renderJSON(content)}</OrderedList>

                case 'listItem':
                    return <ListItem>{renderJSON(content)}</ListItem>

                case 'table':
                    return <Table>{renderJSON(content)}</Table>
                case 'tableRow':
                    return <Tr {...attrs}>{renderJSON(content)}</Tr>
                case 'tableCell':
                    return <Td {...attrs}>{renderJSON(content)}</Td>
                case 'bulletList':
                    return <UnorderedList>{renderJSON(content)}</UnorderedList>
                case 'bulletListItem':
                    return <ListItem>{renderJSON(content)}</ListItem>
            }
        } catch {
            return null
        }
    })
}