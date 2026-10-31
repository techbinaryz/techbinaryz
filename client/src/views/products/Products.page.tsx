import ProblemMission from "@/components/products/ProblemMission";
import Feedback from "@/components/products/Feedback";
import SolutionShip from "@/components/products/SolutionShip";
import OurProducts from "@/components/products/OurProducts";

function ProductsPage() {
    return (
        <>
            <SolutionShip />
            <Feedback />
            <ProblemMission />
            <OurProducts />
        </>
    );
}

export default ProductsPage;
