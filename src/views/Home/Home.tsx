import Slider from "../../components/Slider";
import ProductPage from "./ProductPage";

const sliderItems = [
    <div key={0} className="d-flex align-items-center justify-content-evenly flex-row flex-wrap w-75">
        <h1 style={{ fontSize: 60 }} className="w-75 mx-auto text-start">
            Welcome to Swap it
        </h1>
        <h3 className="text-end mx-auto w-75">
            The web where you can swap games and collectables!
        </h3>
    </div>,
    <h1 key={1} style={{ fontSize: 75 }}>What is swapit?</h1>,
    <h1 key={2}>
        Swap it is the best application for interchanging games and collectibles
    </h1>,
];

function Home() {
    return (
        <>
            <ProductPage>
                <Slider
                    style={{ height: 300 }}
                    slideStyles={{ background: "white" }}
                    sliderItems={sliderItems}
                />
            </ProductPage>
        </>
    );
}

export default Home;
