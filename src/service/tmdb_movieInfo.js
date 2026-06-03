import axiosInstance, { DEFAULT_PARAMS } from "./axios";

const movieInfoRequest = async (endpoint, customParams) => {
    const config = {
        params: {
            ...DEFAULT_PARAMS,
            ...customParams,
        },
    };

    const response = await axiosInstance.get();//
    return response.data;
};

