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

export interface IValiderProps {
  idRef: number;
  buttonTitle: string;
  ctx: any;
}

export default function ValiderRef (props:IValiderProps){
  let [userConn, setUserConn] = React.useState(false);
  React.useEffect(() => {
    user()
  });
  async function user(){
    let user = await sp.web.currentUser();
    var userConnected:any = null
    console.log("user connected =>", user)
    var query = function(element) {
        return element.membre_refId === user.Id;
    };
    await sp.web.lists.getByTitle("l_validateurs").items.getAll().then((res)=>{
      console.log("res", res)
      userConnected = res.filter(query)
      if(userConnected)
        setUserConn(userConn)
      else
        setUserConn(null)
    })
  }

  async function valider(){
    let user = await sp.web.currentUser();
    var _date = new Date().toISOString();
    let itemAvantValid = await sp.web.lists.getByTitle("Comparables").items.getById(props.idRef)
    console.log("itemAvantValid", itemAvantValid)
    await (await sp.web.lists.ensure("Comparables")).list.items.getById(props.idRef).breakRoleInheritance();
    const { Id: roleDefId1 } = await sp.web.roleDefinitions.getByName("Collaboration")();
    const { Id: roleDefId2 } = await sp.web.roleDefinitions.getByName("Après validation des références")();
    const groups1 = await sp.web.siteGroups.getByName("Direction")();
    const groups2 = await sp.web.siteGroups.getByName("Elaborateur_visiteur")();
    await itemAvantValid.roleAssignments.add(groups1.Id, roleDefId1);
    await itemAvantValid.roleAssignments.add(groups2.Id, roleDefId2);
    await sp.web.lists.getByTitle("Comparables").items.getById(props.idRef).update({
      validateur_refId: user.Id,
      date_x0020_de_x0020_validation: _date
    }).then(()=>{
      Dialog.alert(`La référence est validée avec succès.`);
    });
  }
  return (
    <div>{userConn?
      <Stack horizontal horizontalAlign="start"> 
        {/* <a className={styles.Pointer} onClick={() => valider()}>{props.buttonTitle}</a> */}
        <ActionButton iconProps={{iconName: 'VerifiedBrand'}} text={props.buttonTitle} onClick={() => valider()}/>
      </Stack>:<></>}
    </div>
  );
    
}
