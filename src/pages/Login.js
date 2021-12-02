import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

const a = '2021-11-2'
const b = '2021-9'

const dateFormat = 'YYYY-MM-DD';

const Login = () => (
  <div>
    {/* <DatePicker defaultValue={moment(a, dateFormat)} disabled /> */}
    <DatePicker defaultValue={moment(a, dateFormat)} />
    <br />
    <MonthPicker defaultValue={moment(b, 'YYYY-MM')} disabled />
    <br />
    <RangePicker
      defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
      disabled
    />
  </div>);

export default Login