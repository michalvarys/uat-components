import React, { useState, useCallback } from 'react'
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Flex,
    IconButton,
    HStack,
    Image,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export interface GalleryImage {
    src: string
    alt?: string
    title?: string
}

export interface GalleryAttributes {
    images: GalleryImage[]
    columns?: number
    spacing?: number
    aspectRatio?: string
}

interface GalleryDisplayProps {
    attrs: GalleryAttributes
    editable?: boolean
    onEdit?: () => void
}

export const GalleryView: React.FC<GalleryDisplayProps> = ({
    attrs,
    editable = false,
    onEdit,
}) => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleImageClick = (image: GalleryImage, index: number) => {
        setSelectedImage(image);
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const handlePrevImage = useCallback(() => {
        if (!attrs.images || attrs.images.length === 0) return;

        const newIndex = selectedImageIndex > 0
            ? selectedImageIndex - 1
            : attrs.images.length - 1;

        setSelectedImageIndex(newIndex);
        setSelectedImage(attrs.images[newIndex]);
    }, [selectedImageIndex, attrs.images]);

    const handleNextImage = useCallback(() => {
        if (!attrs.images || attrs.images.length === 0) return;

        const newIndex = selectedImageIndex < attrs.images.length - 1
            ? selectedImageIndex + 1
            : 0;

        setSelectedImageIndex(newIndex);
        setSelectedImage(attrs.images[newIndex]);
    }, [selectedImageIndex, attrs.images]);

    const handleThumbnailClick = (index: number) => {
        if (!attrs.images || attrs.images.length === 0) return;

        setSelectedImageIndex(index);
        setSelectedImage(attrs.images[index]);
    };

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            handlePrevImage();
        } else if (e.key === 'ArrowRight') {
            handleNextImage();
        }
    }, [handlePrevImage, handleNextImage]);

    return (
        <Box position="relative">
            <Box pt={4}>
                <Box
                    display="grid"
                    gridTemplateColumns={`repeat(${attrs.columns || 3}, 1fr)`}
                    gap={`${(attrs.spacing || 4) * 0.25}rem`}
                    width="100%"
                >
                    {(attrs.images || [])?.map?.((image, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                cursor: 'pointer',
                                aspectRatio: attrs.aspectRatio || "1",
                            }}
                            onClick={() => handleImageClick(image, index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                title={image.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)';
                                }}
                            />
                        </div>
                    ))}
                </Box>
            </Box>

            {/* Lightbox */}
            <Modal
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent maxW="90vw">
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedImage && (
                            <Flex
                                direction="column"
                                align="center"
                                tabIndex={0}
                                onKeyDown={handleKeyDown}
                            >
                                <Flex w="100%" position="relative" justify="center" align="center">
                                    {/* Left arrow */}
                                    <IconButton
                                        aria-label="Předchozí obrázek"
                                        icon={<ChevronLeftIcon boxSize={8} />}
                                        position="absolute"
                                        left="0"
                                        top="50%"
                                        transform="translateY(-50%)"
                                        onClick={handlePrevImage}
                                        variant="ghost"
                                        size="lg"
                                        zIndex={2}
                                    />

                                    {/* Main image */}
                                    <Box pt={8} px={12} w="100%" textAlign="center">
                                        <img
                                            src={selectedImage.src}
                                            alt={selectedImage.alt}
                                            title={selectedImage.title}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '60vh',
                                                margin: '0 auto',
                                                display: 'block',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Box>

                                    {/* Right arrow */}
                                    <IconButton
                                        aria-label="Další obrázek"
                                        icon={<ChevronRightIcon boxSize={8} />}
                                        position="absolute"
                                        right="0"
                                        top="50%"
                                        transform="translateY(-50%)"
                                        onClick={handleNextImage}
                                        variant="ghost"
                                        size="lg"
                                        zIndex={2}
                                    />
                                </Flex>

                                {/* Thumbnails */}
                                <Box mt={6} w="100%" overflowX="auto">
                                    <HStack spacing={2} justify="center" pb={2}>
                                        {attrs.images.map((image, index) => (
                                            <Box
                                                key={index}
                                                cursor="pointer"
                                                borderWidth={index === selectedImageIndex ? "2px" : "0px"}
                                                borderColor="blue.500"
                                                p={1}
                                                onClick={() => handleThumbnailClick(index)}
                                            >
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt || ''}
                                                    boxSize="60px"
                                                    objectFit="cover"
                                                    opacity={index === selectedImageIndex ? 1 : 0.7}
                                                    _hover={{ opacity: 1 }}
                                                    transition="opacity 0.2s"
                                                />
                                            </Box>
                                        ))}
                                    </HStack>
                                </Box>
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
