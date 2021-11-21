import React, { useState, Fragment, useEffect } from 'react';
import { Tree, Input } from 'antd';
import 'antd/dist/antd.css';

const { TreeNode } = Tree

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

const Demo = (props) => {
  const { branchs, onChange } = props

  const [branchNames, setBranchNames] = useState(branchs)
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]); // '0-0-0', '0-0-1-1'
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    setBranchNames(props.branchs)

    if (branchNames) {
      if (branchNames.includes(',')) {
        setCheckedKeys(branchNames.split(','))
      } else {
        setCheckedKeys([branchNames])
      }
    }
  }, [branchNames, props])

  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    setBranchNames(checkedKeysValue.join(','))
    // control parent state
    onChange(checkedKeysValue)
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  // TODO only one property missing on TreeNode
  const renderTreeList = (treeData) => {
    return treeData.map(item => {
      if (item.children) {
        return (<TreeNode title={item.title} key={item.key}>
          {renderTreeList(item.children)}
        </TreeNode>)
      } else {
        return <TreeNode title={item.title} key={item.key} isLeaf={true}></TreeNode>
      }
    })
  }

  return (
    <Fragment>
      <Input value={branchNames} placeholder="show checked tree... " />
      <Tree
        checkable
        onExpand={onExpand}
        checkStrictly={false}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
      // treeData={treeData}
      >
        {renderTreeList(treeData)}
      </Tree>
    </Fragment>

  );
};

export default Demo