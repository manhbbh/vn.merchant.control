import axios from "axios";
import { get } from "lodash";

import type { InputRequestAxios } from "@/service/interface";

/**
 * Request axios
 * @param {InputRequest} { uri, method, body = {}, headers = {} }
 */
export const requestAxios = async (
    { uri, method, body = {}, headers = {} }: InputRequestAxios
) => {
    try {
        
        /** Lấy ra kết quả request */
        let result = await axios(uri, { method, headers, data: body })

        /** Trả về kết quả */
        if(result.data) return result.data
        
        /** Trả về kết quả */
        return result

    } catch (e) {
        throw get(e, 'response.data.context_error.message') ||
        get(e, 'response.data.message') ||
        get(e, 'response.data') ||
        get(e, 'message') ||
        e
    }
}