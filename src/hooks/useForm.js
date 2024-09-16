import { useEffect, useState } from "react";

export default function useForm() {
    const [communityData, setCommunityData] = useState({});
    const addCommunityData = (data) => {
        setCommunityData((prevState) => ({ ...prevState, ...data }));
    };

    useEffect(() => {
        console.log("Community data: ", communityData);
    }, [communityData]);

    return {
        addCommunityData
    }
}