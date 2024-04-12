import axios, { AxiosRequestConfig } from 'axios'
import { apiRecord, defaultApiResponse, sleepLogEntriesApiType, sleepLogsApiType } from './SleepLogApiTypes'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await api(config)
        if (response.data.errorCode) {
            console.warn(
                `😬 API errored for ${config.url} with '${response.data.message}'`,
                response.data?.details,
            )
        }
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.warn(`😩 Axios error for ${config.url} with this data`, {
                inputs: config.data,
                response: error.response?.data || error.message,
            })
            return error.response?.data
        }
        return {
            message: (error as Error).message
        } as T
    }
}

/**
 * This will create a sleep log entry.
 */
async function createSleepLog(args: { name: string, gender: 'Male' | 'Female', duration: number, day: String }) {
    const axiosConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/v1/sleep/log',
        data: args,
    }
    const response = await request<defaultApiResponse & { record: apiRecord}>(axiosConfig)
    return response
}

/**
 * This will return sleep logs entries per person of everybody.
 */
async function getSleepEntries() {
    const axiosConfig: AxiosRequestConfig = {
        method: 'GET',
        url: '/v1/sleep/entries',
    }
    const response = await request<sleepLogEntriesApiType>(axiosConfig)
    return response
}

/**
 * This will return sleep logs for a given person. The sleep logs returned are limited to last 7 days.
 */
async function getSleepLog(args: { name: string, gender: 'Male' | 'Female'}) {
    const axiosConfig: AxiosRequestConfig = {
        method: 'GET',
        url: '/v1/sleep/log',
        params: args,
    }
    const response = await request<sleepLogsApiType>(axiosConfig)
    return response
}

const obj = {
    createSleepLog,
    getSleepLog,
    getSleepEntries,
}
export default obj