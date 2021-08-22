import {RouteComponentProps} from "react-router-dom";
import React, {useEffect, useState} from "react";
import AnimalService from "../../service/animalService";
import Animal from "../../models/Animal";
import './animalPage.scss'
import {Button} from "@material-ui/core";
import {getTimeDif} from "../../utils/timeHelper";
import {FEED_TIME, HUNGRY_TIME} from "../../utils/constants";

interface AnimalIdParams {
    animalId: string
}

interface AnimalPageProps extends RouteComponentProps<AnimalIdParams> {

}

const AnimalPage: React.FC<AnimalPageProps> = (props) => {

        const [animalData, setAnimalData] = useState<Animal>()

        useEffect(() => {
            updateDate()
            let interval = setInterval(updateDate, 5000);
            return () => clearInterval(interval);
        }, [props.match.params.animalId]);

        const updateDate = () => {
            const lastAnimalsStr = localStorage.getItem("animals");
            if (lastAnimalsStr) {
                const lastAnimalData: Animal[] = JSON.parse(lastAnimalsStr);
                setAnimalData(lastAnimalData.find(item => item.id === +props.match.params.animalId))
            }

        }

        useEffect(() => {
            if (animalData?.lastFed && animalData.isFed) {
                if (new Date().getTime() - new Date(animalData.lastFed).getTime() > FEED_TIME)
                    AnimalService.editAnimal({...animalData, isFed: false})?.then(res => {
                        setAnimalData(res)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }, [animalData])

        const handleFed = () => {
            if (animalData) {

                AnimalService.editAnimal({...animalData, isFed: true, lastFed: new Date().toString()})?.then(res => {
                    setAnimalData(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        }

        return (
            <div className={"animalPage"}>
                <div className={"animalPage__cover"}>
                    <h1>Feed Your Animals..</h1>
                </div>

                {animalData &&
                <div className={"animalPage__content"}>
                    {new Date().getTime() - new Date(animalData.lastFed).getTime() > HUNGRY_TIME &&
                    <p className={"animalPage__content--alarm"}>this animal is hungry</p>
                    }
                    <img src={animalData.imageUrl}/>
                    <div className={"animalPage__content--desc"}>
                        <p>{animalData.name}</p>
                        <p>{animalData.latinName}</p>
                        <p>{animalData.longDescription}</p>
                        <p>year of birth : {animalData.yearOfBirth}</p>
                        <div className={"animalPage__content--time"}>
                            <Button onClick={handleFed} disabled={animalData.isFed}
                                    variant={"contained"}>{animalData.isFed ? "already fed" : "Feed animal"}</Button>
                            <p>Last Fed
                                : {getTimeDif(new Date(animalData.lastFed).getTime())}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
;

export default AnimalPage;
