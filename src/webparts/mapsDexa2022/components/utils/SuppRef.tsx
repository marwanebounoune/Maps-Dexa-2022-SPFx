import "@pnp/sp/folders";
import * as React from 'react';
import { ActionButton, Async, Stack,  } from 'office-ui-fabric-react';
import { sp } from '../../Constants';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/security";
import "@pnp/sp/security/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import { Dialog } from '@microsoft/sp-dialog';


export interface ISuppProps {
    idRef: number;
    buttonTitle: string;
    ctx: any;
}
    export default function SuppRef (props:ISuppProps){
        let [userConn, setUserConn] = React.useState(null);
        React.useEffect(() => {
        user()
        });
        async function user(){
        let user = await sp.web.currentUser();
        var userConnected:any = null
        //console.log("user connected =>", user)
        var query = function(element) {
            return element.membre_refId === user.Id;
        };
        await sp.web.lists.getByTitle("l_validateurs").items.getAll().then(async (res)=>{
            //console.log("res", res)
            userConnected = res.filter(query)
            if(userConnected)
            await setUserConn(userConn)
            else
            await setUserConn(null)
        })
        }

    async function Supprimer(){
        let user = await sp.web.currentUser();
        await sp.web.lists.getByTitle("Comparables").items.getById(props.idRef).update({
            ActeurId: user.Id,
            is_deleted: "Oui",
        }).then(()=>{
        Dialog.alert(`La référence est Supprimer.`);
        }).catch(console.log)
    }
    //console.log("userConn", userConn);
    return (
        <div>{userConn?<></>:
        <Stack horizontal horizontalAlign="start"> 
            <ActionButton iconProps={{iconName: 'Delete'}} text={props.buttonTitle} onClick={() => Supprimer()}/>
        </Stack>}
        </div>
    );
    }
