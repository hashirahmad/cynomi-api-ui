export interface defaultApiResponse {
    message: string | undefined
    errorCode: string | undefined
    details: string[] | undefined
    duration: {
        milliseconds: number,
        seconds: number,
        human: string
    }
}
export type apiRecord = {
    name: string,
    gender: 'Male' | 'Female',
    duration: number,
    dayDate: string,
    id: number
}

export type sleepLogEntriesType = {
    sleepEntries: Pick<apiRecord, 'gender' | 'name'>[] & {entries: number}[]
}
export type sleepLogEntriesApiType = defaultApiResponse & sleepLogEntriesType
export type sleepLogEntry = Omit<apiRecord, 'id' |'dayDate'> & {day: string}

export type sleepLogsApiType = defaultApiResponse & { logs: apiRecord[]}