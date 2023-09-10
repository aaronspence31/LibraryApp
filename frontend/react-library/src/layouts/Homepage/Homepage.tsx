import {Navbar} from "../NavbarAndFooter/Navbar";
import {ExploreTopBooks} from "./components/ExploreTopBooks";
import {Carousel} from "./components/Carousel";
import {Heros} from "./components/Heros";
import {LibraryServices} from "./components/LibraryServices";
import {Footer} from "../NavbarAndFooter/Footer";

export const Homepage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    );
}