import './home.scss'
import Animals from "./components/animals";

const Home = () => {
    return (
        <div className={"home"}>
            <div className={"home__cover"}>
                <h1>Feed Your Animals..</h1>
            </div>
            <Animals/>
        </div>
    );
};

export default Home;
