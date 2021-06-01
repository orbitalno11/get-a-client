import { faAmilia } from "@fortawesome/free-brands-svg-icons";
import { faAtom, faDna, faFlask, faGlobeAsia, faInfinity, faMicroscope, faSquareRootAlt } from "@fortawesome/free-solid-svg-icons";
import { color } from "./color";

const subjectList = [
    {
        subject: "คณิตศาสตร์",
        link: "",
        icon: faSquareRootAlt,
        color: color.MTH
    },
    {
        subject: "ภาษาไทย",
        link: "",
        icon: faInfinity,
        color: color.THA
    },
    {
        subject: "วิทยาศาสตร์",
        link: "",
        icon: faMicroscope,
        color: color.SCI
    },
    {
        subject: "ชีววิทยา",
        link: "",
        icon: faDna,
        color: color.BIO
    },
    {
        subject: "เคมี",
        link: "faFlask",
        icon: faFlask,
        color: color.CHM
    },
    {
        subject: "ฟิสิกส์",
        link: "",
        icon: faAtom,
        color: color.PHY
    },
    {
        subject: "อังกฤษ",
        link: "",
        icon: faAmilia,
        color: color.ENG
    },
    {
        subject: "สังคมศึกษา",
        link: "",
        icon: faGlobeAsia,
        color: color.SOC
    }
]

export default subjectList;