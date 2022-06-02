import { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../interfaces/Product";
import { MdDelete, MdEdit, MdImageNotSupported } from 'react-icons/md';
import ToolTip from './ToolTip';

interface ProductCardProps {
    product: Product;
    onDelete?: () => void | any
    onUpdate?: () => void | any
    editable?: boolean
}

export default function ProductCard({ product, onDelete, onUpdate, editable=false }: ProductCardProps){
    const [imageNotFound, setImageNotFound] = useState(false);

    return (
        <div className="card" style={{width: '15rem', minWidth: 150, minHeight: 200}}>
            {product.images && product.images.length > 0 && !imageNotFound ?
                <img 
                    loading="lazy"
                    onError={() => setImageNotFound(true)} 
                    style={{...styles.imageStyles, objectFit: 'cover'}} 
                    src={product.images[0].image} 
                    alt={product.name} 
                    className="card-img-top" 
                />
                : 
                <div style={styles.imageStyles} className="card-img-top"><MdImageNotSupported size="50px"/></div>
            }
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product?.currency}{product.aproximate_price}</p>
                <div className="d-flex align-items-center justify-content-start flex-wrap">
                    <Link to={`/product-details/${product.id}`} className="btn btn-primary">Product details</Link>
                    <div className="">
                        {editable && 
                            <ToolTip tip="Edit product">
                                <button title="Edit product" onClick={onUpdate} className="btn btn-outline-success">
                                    <MdEdit/>
                                </button>
                            </ToolTip>
                        }
                        {editable && 
                            <ToolTip tip="Delete product">
                                <button title="Delete product" onClick={onDelete} className="btn btn-outline-danger">
                                    <MdDelete/>
                                </button>
                            </ToolTip>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    imageStyles: {
        height: 170,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // objectFit: 'cover',
    }
}