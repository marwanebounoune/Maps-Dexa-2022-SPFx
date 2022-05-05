import * as React from 'react';
import styles from './MapsDexa2022.module.scss';
import { IMapsDexa2022Props } from './IMapsDexa2022Props';
import { escape } from '@microsoft/sp-lodash-subset';
import MapContainer from './MapContainer';

export default class MapsDexa2022 extends React.Component<IMapsDexa2022Props, {}> {
  private old_desc = null;
  constructor(props) {
    super(props);
    this.old_desc=props.description;
    this.state = {old_key: props.description};
  }
  public render(): React.ReactElement<IMapsDexa2022Props> {
    return (
      <div className={ styles.mapsDexa2022 }>
        {console.log("this.props.ctx", this.props)}
        <div className={ styles.container }>
          <div className={ styles.row }>
            <MapContainer context={this.props.ctx} GoogleKey={this.props.description}/>
          </div>
        </div>
      </div>
    );
  }
}