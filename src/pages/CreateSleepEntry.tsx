import { Button, Input, Radio, Select, Slider, Spacer, useToasts,  } from "@geist-ui/core"
import api from '../api/SleepLogApi'
import { useState } from "react"
import { sleepLogEntry } from '../api/SleepLogApiTypes';
import moment from "moment";
import { useNavigate } from "react-router-dom";

const getYearsList = (back: number) => {
  const year = new Date().getFullYear();
  return Array.from({length: back}, (v, i) => year - back + i + 1);
}

const days = Array(31).fill('').map((_, i) => i + 1)
const months = moment.monthsShort()
const years = getYearsList(10)


const CreateSleepEntry = () => {
    const navigate = useNavigate();
    const { setToast } = useToasts()
    const [isLoading, setLoading] = useState(false)
    const [form] = useState<sleepLogEntry>({
      name: '',
      day: '',
      gender: 'Male',
      duration: 8
    })
    const [day, setDay] = useState(moment().date()) 
    const [month, setMonth] = useState(months[moment().month()])
    const [year, setYear] = useState(moment().year())

    const addSleepEntry = async () => {
        form.day = `${year}-${
          months.indexOf(month) + 1 > 9 ? months.indexOf(month) + 1 : "0" + (months.indexOf(month) + 1)
        }-${day > 9 ? day : "0" + day}`
        
        for (const key in form) {
          const value = form[key as keyof typeof form]
          if (!value) {
            setToast({
              text: `${key} required for creating sleep log entry`,
              type: 'warning',
              delay: 1000 * 50
            })
            return
          }
        }

        setLoading(true)
        const result = await api.createSleepLog(form)
        setLoading(false)
        if (result.errorCode) {
          setToast({text: result.message, delay: 1000 * 50, type: 'error' })
        } else {
          setToast({
            text: 'Sleep log entry successfully created',
            type: 'success',
          })
          navigate('/')
        }

    }
  
    return (
      <>
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => navigate("/")}
          style={{float: 'right'}}
          type="secondary"
          loading={isLoading}
        >
          Back to main page
        </Button>
        <Spacer h={1} />
        <div>
          <Input
            clearable
            placeholder="Your full name"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            inputMode="text"
            onChange={v => form.name = v.target.value}
          />
          <Spacer h={1} />
          <Radio.Group value={form.gender} onChange={(v) => form.gender = String(v) as 'Male' | 'Female'} useRow>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
          <Spacer h={1} />
          <div>
            <div>Duration</div>
            <Spacer h={1} />
            <Slider
              max={24}
              min={4}
              step={0.5}
              initialValue={8}
              onChange={v => form.duration = v}
              showMarkers
            />
          </div>
          <Spacer h={1} />
          <div style={{display: 'flex'}}>
            <Select
              initialValue={String(day)}
              placeholder="Day"
              onChange={v => setDay(Number(v))}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {
                days.map(d => <Select.Option key={d} value={d.toString()}>{d}</Select.Option>)
              }
            </Select>
            <Spacer h={0.5} />
            <Select
              initialValue={month}
              placeholder="Month"
              onChange={v => setMonth(v.toString())}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {
                months.map(m => <Select.Option key={m} value={m}>{m}</Select.Option>)
              }
            </Select>
            <Spacer h={0.5} />
            <Select
              initialValue={String(year)}
              placeholder="Year"
              onChange={v => setYear(Number(v))}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {
                years.reverse().map(y => <Select.Option key={y} value={y.toString()}>{y}</Select.Option>)
              }
            </Select>
          </div>
          <Spacer h={1} />
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={addSleepEntry}
            type="success"
            loading={isLoading}
          >
            Create sleep entry
          </Button>
        </div>
      </>
    )
}
export default CreateSleepEntry