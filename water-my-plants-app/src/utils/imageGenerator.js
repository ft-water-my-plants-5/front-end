import aloe from "../images/aloe.jpeg";
import anthurium from "../images/anthurium.jpeg";
import bonsai from "../images/bonsai.jpeg";
import brownPot from "../images/brown-pot.jpeg";
import ficus from "../images/ficus/jpeg";
import succulent from "../images/succulent.jpeg";
import sunflower from "../images/sunflower.jpeg";

const imageGenerator = () => {
  switch (Math.ceiling(Math.random() * 7)) {
    case 1:
      return aloe;
    case 2:
      return anthurium;
    case 3:
      return bonsai;
    case 4:
      return brownPot;
    case 5:
      return ficus;
    case 6:
      return succulent;
    case 7:
      return sunflower
    default:
      return aloe;
  }
};

export default imageGenerator;
