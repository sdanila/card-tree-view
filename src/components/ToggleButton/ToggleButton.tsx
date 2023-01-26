import React, { useState, ReactElement } from 'react';
import block from 'bem-cn'

import { IVisiblyType } from 'App';

import './ToggleButton.scss';

interface IToggleButtonProps {
  disabled?: boolean
  onChange: (type: boolean) => void
  icons: boolean | any
}

const b = block('toggle-button')

function ToggleButton({ disabled, onChange, icons }: IToggleButtonProps): ReactElement {
  const [toggle, setToggle] = useState<boolean>(true);

  const triggerToggle = () => {
    setToggle(!toggle);
    onChange(!toggle);
  }

  const getIcon = (type: IVisiblyType) => {

    if (!icons) {
      return null;
    }

    return icons[type];
  }

  return (
    <div onClick={triggerToggle} className={b({ checked: toggle, disabled })}>
      <div className={b("container")}>
        <div className={b("check")}>
          <span>{getIcon(IVisiblyType.CARD)}</span>
        </div>
        <div className={b("uncheck")}>
          <span>{getIcon(IVisiblyType.TREE)}</span>
        </div>
      </div>
      <div className={b("circle")} />
      <input type="checkbox" className={b("input")} />
    </div>
  );
}

export default ToggleButton;
