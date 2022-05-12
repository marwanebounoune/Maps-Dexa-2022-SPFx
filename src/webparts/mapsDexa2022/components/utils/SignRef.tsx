import "@pnp/sp/folders";
import * as React from 'react';
import { ActionButton, Stack,  } from 'office-ui-fabric-react';
import { sp } from '../../Constants';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/security";
import "@pnp/sp/security/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import { Dialog } from '@microsoft/sp-dialog';

export interface ISignalerProps {
  idRef: number;
  buttonTitle: string;
  ctx: any;
}
export default function SignalerRef (props:ISignalerProps){

    async function Signaler(){
      let user = await sp.web.currentUser();
      const A = await sp.web.lists.getByTitle("Pins").items.getById(props.idRef)()
      var signaleurs:number[] = A.QuiasignalerId
      if(A.QuiasignalerId === null)
        signaleurs = [user.Id]
      else
        signaleurs.push(user.Id)
      console.log("signaleurs", signaleurs)
      console.log("A", A)
      sp.web.lists.getByTitle("Pins").items.getById(props.idRef).update({
        QuiasignalerId: signaleurs,
        Nombredesignalement: ++A.Nombredesignalement
      }).then(()=>{
        Dialog.alert(`La référence est Signaler.`);
      }).catch(console.log)
    }
    return (
        <div>
          <Stack horizontal horizontalAlign="start"> 
            <ActionButton iconProps={{iconName: 'PeopleAlert'}} text={props.buttonTitle} onClick={() => Signaler()}/>
          </Stack>
        </div>
      );
    }
    
