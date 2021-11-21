import React, { Fragment } from 'react'
import { Input } from 'antd'
import TreeDemo from '../components/Tree'

class TreePage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      branchs: ''
    }
  }

  componentDidMount() {
    this.setState({
      branchs: '0-0-0-1,0-0-1'
    })
  }

  handleChange = (values) => {
    this.setState({
      branchs: values.join(',')
    })
  }

  render() {
    return (
      <Fragment>
        <Input value={this.state.branchs} />
        <TreeDemo {...this.state} onChange={this.handleChange} />
      </Fragment>
    )
  }
}

export default TreePage