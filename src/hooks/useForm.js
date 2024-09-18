import { useEffect, useState } from "react";

export default function useForm() {
    const [communityData, setCommunityData] = useState({});
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const updateCommunityName = (name) => {
        setName(name);
    };

    const updateCommunityDesc = (desc) => {
        setDesc(desc);
    };

    const addCommunityData = (data) => {
        setCommunityData((prevState) => ({ ...prevState, ...data }));
    };
    const resetCommunityData = () => {
        setCommunityData({});
    }

    useEffect(() => {
        console.log("community data: ", communityData);
    }, [communityData]);

    return {
        addCommunityData,
        resetCommunityData,
        name,
        desc,
        updateCommunityName,
        updateCommunityDesc,
        communityData
    }
}