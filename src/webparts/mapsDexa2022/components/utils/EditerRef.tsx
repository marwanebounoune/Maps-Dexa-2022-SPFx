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
import { WindowPopUp } from "./utils";


export interface IValiderProps {
    idRef: number;
    buttonTitle: string;
    ctx: any;
  }

export default function EditerRef (props:IValiderProps){
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
      //console.log("userConn", userConn);

      return (
        <div>{userConn?<></>:
          <Stack horizontal horizontalAlign="start"> 
          <ActionButton iconProps={{iconName: 'Edit'}} text={props.buttonTitle} onClick={(event)=> {event.preventDefault(); WindowPopUp('', 'https://agroupma.sharepoint.com/:li:/s/DEXA2022/E6JE6RWBeupIiygDMfN051YBmru874WVyQ8A2UW8589czw?e=4cKQed', "");}}/>
          </Stack>}
        </div>
      );
        
    }


//<ActionButton iconProps={{iconName: 'Add'}} text="Ajouter une référence" onClick={(event)=> {event.preventDefault(); WindowPopUp('', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B07F5F07E-1EB2-4DAC-B792-179E07051324%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100F7E03D0D804B95439DD41BDF9629E31F0088A336F36BC7B840B3BD1A6BA2057C14', "");}}/>



