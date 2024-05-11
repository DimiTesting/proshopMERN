import {Card} from 'react-bootstrap'

function ProductItem ({product}) {
    return (
        <>
            <Card>
                {product.name}
            </Card>
        </>
    )
}

export default ProductItem