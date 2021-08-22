import {ButtonBase} from "@material-ui/core";

const Header = () => {
    return (
        <div className={"header"}>
            <img src={"https://www.chesterzoo.org/app/themes/zoo/dist/images/logos/zoo.svg"}/>
            <ButtonBase>Feed Animals</ButtonBase>
        </div>
    );
};

export default Header;
