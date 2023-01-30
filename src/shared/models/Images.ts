export interface IImage {
  image: string
  filesize: number
  timestamp: number
  category: string
}

export type INodeWithCategories = { [key: string]: IImage[] }

export interface IConvertedCard {
  name: string;
  filesize: number;
  image: string;
  date: string;
  isCard: boolean
}

export interface ITreeStructureChildren {
  name: string
  filesize?: number;
  image?: string;
  isCard?: boolean
  date?: string;
  children?: ITreeStructureChildren[]
}

export interface ITreeStructure {
  name: string
  filesize?: number;
  image?: string;
  isCard?: boolean
  date?: string;
  children?: ITreeStructure[]
}