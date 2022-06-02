import React, { useEffect, useState } from 'react';
import Slider from './../../../components/Slider';
import { deleteProductImageRequest } from '../../../services/products-requests';
import { ProductImage } from './../../../interfaces/Product.d';
import { UserInStorage } from '../../../interfaces/User';
import { MdDelete } from 'react-icons/md';

interface CRUDImageSlider {
    images?: Array<ProductImage>
    storedUser: UserInStorage;
    onDeleteImage?: () => void | any;
}

const ImageDeleteSlider = ({ storedUser, images, onDeleteImage }: CRUDImageSlider) => {
    const [imagesState, setImagesState] = useState<Array<ProductImage>>();

    useEffect(() => {
        setImagesState(images)
    }, [images])

    const ImageSlide = ({ image }: { image: ProductImage }) => {
        return (
            <>
                <style>{`
                    .delete-hover-container{
                        background-attachment: fixed;
                        background-size: cover;
                        background-position: center;
                        height: 400px;
                        width: 100%;
                    }
                `}</style>
                <div
                    className="delete-hover-container d-flex flex-row align-items-start justify-content-start"
                    style={{ backgroundImage: `url("${image.image}")` }}
                >
                    <button
                        className="btn btn-danger ms-4 mt-4"
                        onClick={() => {
                            image.id && deleteProductImageRequest(storedUser, image?.id, onDeleteImage)
                            setImagesState(imagesState?.filter(image_ => image !== image_));
                        }}
                    >
                        <MdDelete />
                    </button>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (images) setImagesState(images);
    }, [images])

    return (
        <Slider
            style={{ width: '100%', height: 'auto' }}
            sliderItems={
                imagesState && imagesState.length > 0 ?
                    imagesState.map((image, index) => <ImageSlide key={index} image={image} />)
                    :
                    []
            }
        />
    )
}

export default ImageDeleteSlider;