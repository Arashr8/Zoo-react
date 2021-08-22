import {useEffect, useState} from "react";
import Animal from "../../../models/Animal";
import AnimalService from "../../../service/animalService";
import {useHistory} from 'react-router-dom'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {HUNGRY_TIME} from "../../../utils/constants";
import {Tooltip} from "@material-ui/core";
import {getTimeDif} from "../../../utils/timeHelper";

const Animals = () => {

    const history = useHistory();
    const [data, setData] = useState<Animal[]>([])

    useEffect(() => {
        getData()
        let interval = setInterval(getData, 5000);
        return () => clearInterval(interval);
    }, [])

    const getData = () => {
        const lastAnimals = localStorage.getItem("animals");
        if (lastAnimals) {
            setData(JSON.parse(lastAnimals));
        } else {
            AnimalService.getAnimals().then(data => {
                localStorage.setItem("animals", JSON.stringify(data.data))
                setData(data.data);
            })
        }
    }

    const isAnimalHungry = (animal: Animal): boolean => {
        return new Date().getTime() - new Date(animal.lastFed).getTime() > HUNGRY_TIME
    }

    return (
        <div className={"home__list"}>
            <h1>Animal List</h1>
            <ul>
                {data.map(item => <li key={item.id} onClick={() => history.push(`/${item.id}`)}>
                        {isAnimalHungry(item) && <Tooltip
                            title={`This animal has been fed ${getTimeDif(new Date(item.lastFed).getTime())}`}><FastfoodIcon/></Tooltip>}
                        <img src={item.imageUrl}/>
                        <h3>{item.name}</h3>
                        <p>{item.shortDescription}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Animals;
