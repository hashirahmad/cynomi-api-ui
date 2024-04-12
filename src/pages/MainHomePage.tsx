import { Button, Loading, Spacer, Table,  } from "@geist-ui/core"
import api from '../api/SleepLogApi'
import { useEffect, useState } from "react"
import { sleepLogEntriesApiType } from '../api/SleepLogApiTypes';
import { useNavigate } from "react-router-dom";

const MainHomePage = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true)
    const [entries, setEntries] = useState<sleepLogEntriesApiType>()
    useEffect(() => {
        (async function() {
            const data = await api.getSleepEntries()
            setEntries(data)
            setLoading(false)

        })()
    }, [])
    
    if (isLoading) return (
        <Loading>Getting sleep logs</Loading>
    )

    return (
      <>
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => navigate('/entry')}
          style={{float: 'right'}}
          type="success"
        >
          Create sleep log
        </Button>
        <Spacer h={3} />
        <Table data={entries?.sleepEntries} onRow={ v => navigate('/history', { state: v })}>
          <Table.Column prop="name" label="name" />
          <Table.Column prop="gender" label="gender" />
          <Table.Column prop="entries" label="entries" />
        </Table>
      </>
    )
}
export default MainHomePage