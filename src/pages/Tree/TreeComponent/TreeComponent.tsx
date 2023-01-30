import React, { useState } from 'react';
import block from 'bem-cn';

import { ITreeStructure } from 'shared/models/Images';
import { urlData } from 'shared/utils/constants';

import './TreeComponent.scss';

interface ITreeNode {
  node: ITreeStructure
  depth?: number
}

const b = block('tree-component')

export default function TreeComponent({ node, depth = 0 }: ITreeNode) {
  const [toggled, setToggled] = useState<boolean>(false);

  const onToggleHandler = () => {
    setToggled(prev => !prev)
  }

  const listItem = () => {
    switch (node.isCard) {
      case true:
        return (
          <li className={b('list-item', { isCard: true })}>
            <div className={b('title')}>
              <div className={b('image-wrapper')}>
                <img
                  className={b('image')}
                  src={`${urlData}/${node.image}`}
                  alt={node.name}
                />
              </div>
              <span>{node.name}</span>
            </div>
            <div>{node.date}</div>
            <div>{node?.filesize} MB</div>
          </ li>
        )
      default:
        return (
          <li className={b('list-item')} onClick={onToggleHandler}>
            {node.name}
          </ li>
        )
    }
  }

  return (
    <ul className={b('list')} style={{ paddingLeft: depth * 20 }}>
      {listItem()}
      {toggled &&
        node.children &&
        node.children.map((child, index) => (
          <TreeComponent key={index} node={child} depth={depth + 1} />
        ))}
    </ul>
  );
};