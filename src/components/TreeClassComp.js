import React, { Fragment } from "react";
import { Input, Tree } from 'antd'
import 'antd/dist/antd.css';

const { TreeNode } = Tree

class TreeComp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      branchNames: '',
      checkedKeys: [],
      expandedKeys: [],
      autoExpandParent: true
    }
  }

  componentDidMount() {
    // this.setState({
    //   branchNames: this.props.branchs,
    // })
    this.setCheckedKeys(this.props.branchs)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.branchs !== this.props.branchs) {
      this.setCheckedKeys(this.props.branchs)
    }
  }
  setCheckedKeys = (value) => {
    this.setState({
      branchNames: value,
      checkedKeys: this.handleKeys(value)
    })
  }

  handleKeys = (value) => {
    if (value) {
      if (value.includes(',')) {
        return value.split(',')
      } else {
        return [value]
      }
    } else {
      return []
    }
  }


  onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys: expandedKeysValue,
      autoExpandParent: false
    })
  };

  onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    this.setState({
      checkedKeys: checkedKeysValue,
      branchNames: checkedKeysValue.join(',')
    })
    // control parent state
    this.props.onChange(checkedKeysValue)
  };



  renderTreeList = (treeData) => {
    return treeData.map(item => {
      if (item.children) {
        return (<TreeNode title={item.title} key={item.key}>
          {this.renderTreeList(item.children)}
        </TreeNode>)
      } else {
        return <TreeNode title={item.title} key={item.key} isLeaf={true}></TreeNode>
      }
    })
  }

  render() {
    const treeData = [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              {
                title: '0-0-0-0',
                key: '0-0-0-0',
              },
              {
                title: '0-0-0-1',
                key: '0-0-0-1',
              },
              {
                title: '0-0-0-2',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              {
                title: '0-0-1-0',
                key: '0-0-1-0',
              },
              {
                title: '0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: '0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0-0',
            key: '0-1-0-0',
          },
          {
            title: '0-1-0-1',
            key: '0-1-0-1',
          },
          {
            title: '0-1-0-2',
            key: '0-1-0-2',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ];
    return (
      < Fragment >
        <Input value={this.state.branchNames} placeholder="show checked tree... " />
        <Tree
          checkable
          onExpand={this.onExpand}
          checkStrictly={false}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.selectedKeys}
        // treeData={treeData}
        >
          {this.renderTreeList(treeData)}
        </Tree>
      </Fragment >
    )
  }
}

export default TreeComp