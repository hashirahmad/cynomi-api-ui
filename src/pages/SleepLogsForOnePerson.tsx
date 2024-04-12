import { Button, Loading, Note, Spacer, User } from "@geist-ui/core"
import api from '../api/SleepLogApi'
import { useEffect, useState } from "react"
import { sleepLogsApiType } from '../api/SleepLogApiTypes';
import { useNavigate, useLocation } from "react-router-dom";
import ReactECharts from 'echarts-for-react';


const SleepLogsForOnePerson = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [logs, setLogs] = useState<sleepLogsApiType>()
    const BackButton = () => <Button
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onClick={() => navigate('/')}
      style={{float: 'right'}}
      type="secondary"
    >
        Back to main page
    </Button>
    const Person = () => <User name={location.state.name}>
      {location.state.gender}
    </User>
    useEffect(() => {
        (async function() {
            const data = await api.getSleepLog({gender: location.state.gender, name: location.state.name})
            setLogs(data)
            setLoading(false)
        })()
    }, [location])
    
    if (isLoading) return (
      <>
        <Person />
        <Loading>Getting sleep logs</Loading>
      </>
    )

    const options = {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: 'category',
        data: logs?.logs.map(o => o.dayDate),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: logs?.logs.map(o => o.duration),
          type: 'line',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
    };

    if (logs?.errorCode) return (
      <div>
        <BackButton />
        <Person />
        <Spacer h={3} />
        <Note label={false} type="error" style={{display: 'flex'}}>{logs.message}</Note>
      </div>
    )

    if (!logs?.logs.length) return (
      <div>
        <BackButton />
        <Person />
        <Spacer h={3} />
        <Note label={false} type="warning" style={{display: 'flex'}}>{
          `No logs found in the last 7 days`
        }</Note>
      </div>
    )

    return (
      <>
        <BackButton />
        <Person />
        <Spacer h={3} />
        <ReactECharts option={options} />
      </>
    )
}
export default SleepLogsForOnePerson