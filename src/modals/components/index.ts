import React from 'react';

import { Image } from "./Image/Image";

interface IModalRoutesItem {
  id: string
  Component: React.FC<any>
}

export const modals: IModalRoutesItem[] = [
  {
    id: 'image',
    Component: Image,
  }
]