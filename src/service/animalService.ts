import http from './httpService';
import Animal from "../models/Animal";
import {AxiosResponse} from "axios";

const animalEndPoints = "/animals"

export default class AnimalService {
    static getAnimals(): Promise<AxiosResponse<Animal[]>> {
        return http.get(animalEndPoints)
    }

    static editAnimal(animal: Animal): Promise<Animal> | undefined {
        const lastAnimalsStr = localStorage.getItem("animals");
        if (lastAnimalsStr) {
            const lastAnimalData: Animal[] = JSON.parse(lastAnimalsStr);
            const newData = lastAnimalData.map(item => {
                if (item.id === animal.id)
                    return animal
                else return item;
            })
            localStorage.setItem("animals", JSON.stringify(newData));
            return Promise.resolve({...animal})
        }
    }
}
