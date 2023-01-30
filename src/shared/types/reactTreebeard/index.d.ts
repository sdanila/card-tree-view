/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
declare module 'react-treebeard' {

  interface ITreebeardProps {
    id?: string
    name: string
    children?: array
    toggled?: boolean
    active?: boolean
    loading?: boolean
    decorators?: object
    animations?: object
  }

  export default ITreebeard as ITreebeardProps;
}