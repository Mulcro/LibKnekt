import { FaUser } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FaPenNib } from "react-icons/fa";
import { GiCardPick } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";

export const data = [
    {
        title: "Home",
        path: "/",
        icon: <IoMdHome />,
        cName: "side-text"
    },
    {
        title: "All books",
        path: "/books",
        icon: <GiBookshelf/>,
        cName: "side-text",

    },
    // {
    //     title: "All Categories",
    //     path: "/categories",
    //     icon: <GiCardPick />,
    //     cName: "side-text",

    // },
    // {
    //     title: "All Authors",
    //     path: "/authors",
    //     icon: <FaPenNib />,
    //     cName: "side-text",

    // },
    {
        title: "Search Books",
        path: "/search",
        icon: <IoSearchOutline/>,
        cName: "side-text",

    },
    {
        title: "Admin",
        path: "/admin",
        icon: <FaUser/>,
        cName: "side-text",

    }
    // "All books",
    // "Categories",
    // "Authors",
    // "Search",
]