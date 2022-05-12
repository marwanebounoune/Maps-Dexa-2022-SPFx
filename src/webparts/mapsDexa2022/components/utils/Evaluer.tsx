import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/items/get-all";
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IDropdownOption, IDropdownStyles, Panel, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { DISTANCE_END_EVALUATION, DISTANCE_START_EVALUATION, sp } from '../../Constants';
import { calculated_score, estimated_price, extendDistanceEvaluer, getLat, getLng } from './utils';
import PopOut from '../fabric-ui/PopOut';
import "@pnp/sp/webs";
import styles from '../MapsDexa2022.module.scss';

interface IEvaluerProps {
  buttonTitle: string;
  latlng:string;
  dgi:any;
  handleEvaluer({}):any;
}

export default function Evaluer (props:IEvaluerProps){
  let [isOpen, setIsOpen] = React.useState(false);
  let [alert, setAlert] = React.useState(false);
  
  var dialogContentProps = {
    type: DialogType.normal,
    title: 'Alert',
    subText: "Cette fonctionalite en cours de developpement."
  };
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  return (
    <div>
      <Stack horizontal horizontalAlign="start"> 
        <ActionButton iconProps={{iconName: 'NewsSearch'}} text={props.buttonTitle} onClick={() => setIsOpen(true)}/>
      </Stack>
      <Dialog hidden={!isOpen} onDismiss={()=>setIsOpen(false)} dialogContentProps={dialogContentProps} modalProps={modelProps}>
        <DialogFooter>
          <DefaultButton onClick={()=>setIsOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
}

