import bgImg from "./bg.jpg";
import bgBlueImg from "./bgblue.jpg"
import avatarIcon from "./avatarIcon.png"
import gunIcon from "./gunIcon.png"
import PistolImg from "./Pistol.png";
import SniperImg from "./Sniper.png";
import AKImg from "./AK.png";
import SMGImg from "./SMG.png";
import RevolverImg from "./Revolver.png";
import RevolverSmallImg from "./Revolver_Small.png";
import ShotgunImg from "./Shotgun.png";
import ShortCannonImg from "./ShortCannon.png";
import chatIcon from "./chatIcon.png"

export { ReactComponent as RightArrowIcon } from "./rightArrowIcon.svg";
export { ReactComponent as LeftArrowIcon } from "./leftArrowIcon.svg";
export { bgImg, bgBlueImg, avatarIcon, gunIcon, chatIcon };

export const weaponsData = [
    {
        id: 1,
        name: "Pistol",
        src: PistolImg,
    },
    {
        id: 2,
        name: "Sniper",
        src: SniperImg,
    },
    {
        id: 3,
        name: "AK",
        src: AKImg,
    },
    {
        id: 4,
        name: "Revolver Small",
        src: RevolverSmallImg,
    },
    {
        id: 5,
        name: "Revolver",
        src: RevolverImg,
    },
    {
        id: 6,
        name: "ShortCannon",
        src: ShortCannonImg,
    },
    {
        id: 7,
        name: "Shotgun",
        src: ShotgunImg,
    },
    {
        id: 8,
        name: "SMG",
        src: SMGImg,
    },
];
