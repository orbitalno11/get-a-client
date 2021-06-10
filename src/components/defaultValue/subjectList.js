import { faAmilia } from "@fortawesome/free-brands-svg-icons";
import { faAtom, faDna, faFlask, faGlobeAsia, faInfinity, faMicroscope, faSquareRootAlt } from "@fortawesome/free-solid-svg-icons";
import { color } from "./color";

const subjectList = [
    {
        subject: "คณิตศาสตร์",
        id : "MTH",
        icon: faSquareRootAlt,
        color: color.MTH
    },
    {
        subject: "ภาษาไทย",
        id : "THA",
        icon: faInfinity,
        color: color.THA
    },
    {
        subject: "วิทยาศาสตร์",
        id : "SCI",
        icon: faMicroscope,
        color: color.SCI
    },
    {
        subject: "ชีววิทยา",
        id : "BIO",
        icon: faDna,
        color: color.BIO
    },
    {
        subject: "เคมี",
        id : "CHM",
        icon: faFlask,
        color: color.CHM
    },
    {
        subject: "ฟิสิกส์",
        id : "PHY",
        icon: faAtom,
        color: color.PHY
    },
    {
        subject: "อังกฤษ",
        id : "ENG",
        icon: faAmilia,
        color: color.ENG
    },
    {
        subject: "สังคมศึกษา",
        id : "SOC",
        icon: faGlobeAsia,
        color: color.SOC
    }
]

export default subjectList;