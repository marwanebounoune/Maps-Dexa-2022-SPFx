import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/items/get-all";
import * as React from 'react';
import "@pnp/sp/site-users/web";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "../../Constants";
import { getUser } from "./utils";
import { ActionButton, Panel, Stack } from "office-ui-fabric-react";


interface IFiltrerWithUserProps {
  context:any;
  buttonTitle: string;
  latlng:string;
  dgi:any;
  handleFilterWhithUser({}):any;
}


export default function FiltrerWithUser (props:IFiltrerWithUserProps){
  let [alertAutorisation, setAlertAutorisation] = React.useState(false);
  let [isOpen, setIsOpen] = React.useState(false);
  async function _getPeoplePickerItems(items: any[]) {
    var userId = await (await getUser(items[0].secondaryText)).data.Id;
    var query = function(element) {
      return element.AuthorId === userId;
    };
    const Refs:any = await sp.web.lists.getByTitle("Comparables").items.getAll();
    const refs = Refs.filter(query);
    props.handleFilterWhithUser(refs);
  }
  return (<div>
    
      <Stack horizontal horizontalAlign="start">
        <ActionButton iconProps={{iconName: 'ProfileSearch'}} text={props.buttonTitle} onClick={() => setIsOpen(true)}/>
      </Stack>
      <Panel isOpen={isOpen} onDismiss={()=> setIsOpen(false)} headerText="FILTRAGE" closeButtonAriaLabel="Close">
        <PeoplePicker context={props.context}
          titleText="Filtrer par créateur de la référence"
          personSelectionLimit={1}
          showtooltip={true}
          required={true}
          onChange={_getPeoplePickerItems}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User]}
          resolveDelay={1000}
          disabled={false}
          ensureUser={true}
        />
      </Panel>
    </div>
  );
}

